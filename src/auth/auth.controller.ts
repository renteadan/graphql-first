import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Get('google/oauth')
  googleAuth(@Query('code') query: string) {
    return this.service.handleGoogleOAuth(query);
  }
}
