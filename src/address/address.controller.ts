import {
  Controller,
  UseGuards,
  Get,
  Session,
  Delete,
  Param,
  ParseUUIDPipe,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddressService } from './address.service';
import { Roles, User } from '@prisma/client';
import { UpdateAddressDTO } from './dto/UpdateAddress.dto';

@Controller('addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  createAddress(@Session() session, @Body() body: UpdateAddressDTO) {
    const user: User = session.passport.user;
    return this.addressService.create(user.id, body);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getAddresses(@Session() session) {
    const user: User = session.passport.user;
    if (user.role === Roles.ADMIN) {
      return this.addressService.getAll();
    }
    return this.addressService.getOwnedAddresses(user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  deleteAddress(@Param('id', new ParseUUIDPipe()) id, @Session() session) {
    const user: User = session.passport.user;
    if (user.role === Roles.ADMIN) {
      return this.addressService.deleteAddress(id);
    }
    return this.addressService.deleteOwnAddress(id, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  updateAddress(
    @Param('id', new ParseUUIDPipe()) id,
    @Session() session,
    @Body() body: UpdateAddressDTO,
  ) {
    const user: User = session.passport.user;
    if (user.role === Roles.ADMIN) {
      return this.addressService.updateAddress(id, body);
    }
    return this.addressService.updateOwnAddress(id, user.id, body);
  }
}
