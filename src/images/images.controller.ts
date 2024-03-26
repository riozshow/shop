import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Get,
  UploadedFile,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/auth/admin.guard';
import { UploadImageDTO } from './dto/UploadImage.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get(':id')
  getImage(@Param('id', new ParseUUIDPipe()) id, @Response() res) {
    return this.imagesService.getImage(id, res);
  }

  @Post('setDefault/:id')
  setDefault(@Param('id', new ParseUUIDPipe()) id) {
    return this.imagesService.setDefault(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { limits: { fileSize: 1024 * 1024 } }),
  )
  @UseGuards(AdminGuard)
  upload(@UploadedFile() file, @Body() body: UploadImageDTO) {
    return this.imagesService.upload(file, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id) {
    return this.imagesService.delete(id);
  }
}
