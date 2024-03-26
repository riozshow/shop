import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { UploadImageDTO } from './dto/UploadImage.dto';
import { Upload } from '@aws-sdk/lib-storage';
import { Image } from '@prisma/client';

@Injectable()
export class ImagesService {
  private readonly bucketName = process.env.BUCKET_NAME;
  private readonly region = process.env.BUCKET_REGION;
  private readonly accessKey = process.env.S3_ACCESS_KEY;
  private readonly secretKey = process.env.S3_SECRET_KEY;
  private readonly s3;

  constructor(private db: DbService) {
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
    });
  }

  async upload(file, body: UploadImageDTO): Promise<Image> {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException(
        'You must attach one of the related content Ids: productId | couponId | discountId | categoryId ',
      );
    }

    await this.checkIfContentExist(body);

    const image = await this.db.image.create({
      data: body,
    });

    const params = {
      Body: file.buffer,
      Bucket: this.bucketName,
      Key: image.id,
    };

    await new Upload({ client: this.s3, params }).done();

    return image;
  }

  async getImage(Key: string, res: Response) {
    const input = {
      Bucket: this.bucketName,
      Key,
    };

    const command = new GetObjectCommand(input);
    const image = await this.s3.send(command);
    if (image) {
      return image.Body.pipe(res);
    }
    throw new BadRequestException('This image does not exist');
  }

  async setDefault(Key: string) {
    const image = await this.db.image.findUnique({ where: { id: Key } });
    if (image) {
      const { productId, categoryId, couponId, discountId } = image;
      await this.db.image.updateMany({
        where: { productId, categoryId, couponId, discountId },
        data: { isDefault: false },
      });
      return await this.db.image.update({
        where: { id: Key },
        data: { isDefault: true },
      });
    }
    throw new BadRequestException('This image does not exist');
  }

  async delete(Key: string) {
    try {
      await this.db.image.delete({ where: { id: Key } });
    } catch {
      throw new BadRequestException('This image does not exist');
    }

    const input = {
      Bucket: this.bucketName,
      Key,
    };
    await this.s3.send(new DeleteObjectCommand(input));
    return { message: 'Image successfully deleted!' };
  }

  async checkIfContentExist(body: UploadImageDTO) {
    const errors = [];

    if (body.productId) {
      const product = await this.db.product.findUnique({
        where: { id: body.productId },
      });
      if (!product) errors.push('productId');
    }

    if (body.couponId) {
      const coupon = await this.db.coupon.findUnique({
        where: { id: body.couponId },
      });
      if (!coupon) errors.push('couponId');
    }

    if (body.discountId) {
      const discount = await this.db.discount.findUnique({
        where: { id: body.discountId },
      });
      if (!discount) errors.push('discountId');
    }

    if (body.categoryId) {
      const category = await this.db.category.findUnique({
        where: { id: body.categoryId },
      });
      if (!category) errors.push('categoryId');
    }

    if (errors.length > 0) {
      throw new BadRequestException(
        `Unable to find requested Ids: ${errors.join(', ')}`,
      );
    }
  }
}
