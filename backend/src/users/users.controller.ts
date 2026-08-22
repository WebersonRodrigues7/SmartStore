import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './DTO/users.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: UserDTO) {
    const newUser = await this.usersService.createUser(body);

    return newUser;
  }

  @Post('/admin')
  async createAdmin(@Body() body: UserDTO){
    const newuser = await this.usersService.createAdminUser(body)

    return newuser
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/')
  async updateUser(@Req() req, @Body() body: UserDTO) {
    const updtUser = await this.usersService.updateUser(req.user.id, body);

    return updtUser;
  }

  @Get()
  async getUser(@Req() req) {
    const findUser = await this.usersService.findUser(req.user.id);

    return findUser


  }
}
