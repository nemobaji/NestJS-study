import { Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import configuration from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // true로 설정하지 않을 경우, 이를 사용할 모듈에 ConfigModule을 임포트해야합니다.
      load: [configuration],
    }),
    ConditionalModule.registerWhen(ConfigurationModule, 'USE_FOO'), // 환경 변수의 boolean 값에 따라 모듈의 등록 여부를 결정합니다.
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
