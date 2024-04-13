import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtGuard } from '@app/common';

@Controller('user')
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get()
  async getSingleUser() {
    console.log('volume binding is working now..');
  }
}
