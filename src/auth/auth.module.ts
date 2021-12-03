import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './strategy/firebase-auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
