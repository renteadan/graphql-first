import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

export interface IConfig {
  env: string;
  JWT_SECRET: string;
  TYPEORM_CONNECTION: string;
  TYPEORM_HOST: string;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_DATABASE: string;
  TYPEORM_PORT: string;
  TYPEORM_SYNCHRONIZE: string;
  TYPEORM_LOGGING: string;
  TYPEORM_ENTITIES: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_DATABASE_URL: string;
}

@Injectable()
export class ConfigProvider {
  private envConfig: IConfig;

  constructor() {
    dotenv.config();
    this.envConfig = process.env as any as IConfig;
  }

  get config(): IConfig {
    return this.envConfig;
  }
}
