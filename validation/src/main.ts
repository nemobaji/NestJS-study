import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 애플리케이션 수준에서 설정하여 모든 엔드포인트가 잘못된 데이터를 받지 않도록 합니다.
  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 포함되지 않은 속성은 결과 객체에서 제거됩니다.
      whitelist: true,
      // whitelist가 활성화 된 상태에서, 포함되지 않은 속성이 있을 경우 에러를 발생시킵니다.
      forbidNonWhitelisted: true,
      // 페이로드를 DTO 클래스 혹은 명시된 타입에 맞는 속성으로 자동 변환시킵니다. 메서드 레벨에서 설정 가능합니다.
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
