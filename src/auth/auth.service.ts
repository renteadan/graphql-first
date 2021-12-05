import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { ConfigProvider } from 'src/config/config.service';
import { AuthProvider, User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Role } from 'src/public/enums/role.enum';

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

  /**
   * find the internal id of the firebase user. if the user doesn't exist, we create it
   * @param firebaseUser decoded firebase JWT
   * @returns the user's internal id
   */
  async findOrCreateUser(
    firebaseUser: DecodedIdToken,
  ): Promise<{ id: number; role: Role }> {
    const user = await this.userRepository.findOne({
      firebaseId: firebaseUser.uid,
    });
    if (user) {
      return { id: user.id, role: user.role };
    }
    let newUser = new User();
    newUser.firebaseId = firebaseUser.uid;
    newUser.email = firebaseUser.email;
    newUser.name = firebaseUser.name;
    newUser.authProvider = firebaseUser.firebase
      .sign_in_provider as AuthProvider;
    newUser.firebaseObject = firebaseUser;
    newUser = await this.userRepository.save(newUser);
    return { id: newUser.id, role: newUser.role };
  }
}
