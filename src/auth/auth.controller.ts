import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guard/firebase-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('test')
  @UseGuards(FirebaseAuthGuard)
  test() {
    return 'test';
  }
}
