import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import admin from 'firebase-admin';
import { ConfigProvider } from './config/config.service';

async function bootstrap() {
  const configProvider = new ConfigProvider();
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: configProvider.config.FIREBASE_CLIENT_EMAIL,
      privateKey: configProvider.config.FIREBASE_PRIVATE_KEY,
      projectId: configProvider.config.FIREBASE_PROJECT_ID,
    }),
    databaseURL: configProvider.config.FIREBASE_DATABASE_URL,
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
