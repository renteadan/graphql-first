import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from 'src/public/decorators/role.decorator';
import { Role } from 'src/public/enums/role.enum';
import { RequestUserInterface } from 'src/public/interfaces/request-user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Roles(Role.ADMIN)
  @Get('test')
  test(@Req() req: RequestUserInterface) {
    return 'test';
  }
}
