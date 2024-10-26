import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ParamId } from '@/decorators/param-id.decorator';
import { CreateUserDto } from '@/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dtos/update-user.dto';
import { UserService } from '@/modules/user/user.service';
import { CreateUserByInviteDto } from '@/modules/user/dtos/create-user-by-invite.dto';
import { UpdateStripeDto } from '@/modules/user/dtos/update-stripe.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Post('invite')
  async createUserByInvite(@Body() data: CreateUserByInviteDto) {
    return this.userService.createUserByInvite(data);
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  async update(@ParamId() id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Patch('stripe/:email')
  async updateStripeData(
    @Param('email') email: string,
    @Body() data: UpdateStripeDto,
  ) {
    console.log(data);
    return this.userService.updateStripeData(data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.userService.delete(id);
  }
}
