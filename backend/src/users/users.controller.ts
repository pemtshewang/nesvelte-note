import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get("user")
  async getUserByName(@Query() { name }: { name: string }) {
    return this.userService.getUsersByName(name);
  }

  @Get('all-users')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('register')
  async createUser(@Body() data: UserDTO) {
    return this.userService.createUser(data);
  }

  @Delete('delete-user/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById({ id: Number(id) });
  }

  @Delete('delete-all')
  async deleteUsers() {
    return this.userService.deleteAllUsers();
  }

}
