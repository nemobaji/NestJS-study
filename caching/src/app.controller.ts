import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

// 라우트 수준에서 캐싱하기 위해 다음과 같은 데코레이터를 선언합니다.
// @UseInterceptors(CacheInterceptor)
// 해당 인터셉터는 GET 요청에 대해서만 캐싱합니다.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 전역 캐시가 활성화된 상태에서 캐시 항목은 라우트 경로를 기반으로 생성된 CacheKey에 저장됩니다.
  // 혹은 CacheKey를 사용하여 각 메서드 단위로 캐시 항목을 특정할 수 있습니다.
  @CacheKey('get_hello')
  @CacheTTL(60)
  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
