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
}

@Injectable()
export class ConfigService {
  private envConfig: IConfig;

  constructor() {
    dotenv.config();
    this.envConfig = process.env as any as IConfig;
  }

  get config(): IConfig {
    return this.envConfig;
  }
}
