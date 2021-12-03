import { Global, Module } from '@nestjs/common';
import { ConfigProvider } from './config.service';

@Global()
@Module({
  exports: [ConfigProvider],
  providers: [ConfigProvider],
})
export class ConfigModule {}
