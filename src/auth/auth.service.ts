import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { ConfigProvider } from 'src/config/config.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import admin from 'firebase-admin';

@Injectable()
export class AuthService {
  client: OAuth2Client;
  app: admin.app.App;
  constructor(
    configProvider: ConfigProvider,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.client = new google.auth.OAuth2({
      clientId: configProvider.config.GOOGLE_CLIENT_ID,
      clientSecret: configProvider.config.GOOGLE_CLIENT_SECRET,
      redirectUri: configProvider.config.GOOGLE_REDIRECT_URI,
    });
    this.app = admin.app();
  }
}
