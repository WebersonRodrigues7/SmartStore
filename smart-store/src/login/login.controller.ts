import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDTO } from '../users/DTO/users.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('/auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @Post()
  async login(@Body() body: UserDTO) {
    try {
      const authLogin = await this.loginService.Login(body);

      return authLogin;
    } catch (err) {
      throw new NotFoundException('Usuário e/ou senha errado(s)!');
    }
  }
}
