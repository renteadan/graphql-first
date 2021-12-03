import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { ConfigProvider } from 'src/config/config.service';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigProvider],
      useFactory: async (configService: ConfigProvider) => ({
        secret: configService.config.JWT_SECRET,
      }),
    }),
  ],
})
export class UserModule {}
