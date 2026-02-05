import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // 서비스에 저장된 설정(config)을 main.ts에서 사용할 수 있습니다.
  const port = configService.get<number>('port');
  await app.listen(port ?? 3000);
}
bootstrap();
