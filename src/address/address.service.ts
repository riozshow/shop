import { BadRequestException, Injectable } from '@nestjs/common';
import { Address, User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { RegularUserAddressDTO } from './dto/RegularUserAddress.dto';
import { UpdateAddressDTO } from './dto/UpdateAddress.dto';

@Injectable()
export class AddressService {
  constructor(private db: DbService) {}

  getAll(): Promise<Address[]> {
    return this.db.address.findMany({});
  }

  getById(
    id: Address['id'],
    userId: Address['id'] | undefined,
  ): Promise<Address> {
    return this.db.address.findUnique({ where: { id, userId } });
  }

  getOwnedAddresses(userId: User['id']): Promise<RegularUserAddressDTO[]> {
    return this.db.address.findMany({
      where: { userId },
    });
  }

  async deleteAddress(id: Address['id']) {
    try {
      return await this.db.address.delete({ where: { id } });
    } catch {
      throw new BadRequestException('Address not exist');
    }
  }

  async deleteOwnAddress(id: Address['id'], userId: User['id']) {
    try {
      return await this.db.address.delete({ where: { id, userId } });
    } catch (err) {
      throw new BadRequestException('Address not exist');
    }
  }

  async create(userId: User['id'], data: UpdateAddressDTO) {
    return this.db.address.create({
      data: { userId, ...data },
    });
  }

  updateAddress(id: Address['id'], data: UpdateAddressDTO) {
    return this.db.address.update({
      where: { id },
      data,
    });
  }

  updateOwnAddress(
    id: Address['id'],
    userId: User['id'],
    data: UpdateAddressDTO,
  ) {
    return this.db.address.update({
      where: { id, userId },
      data,
    });
  }
}
