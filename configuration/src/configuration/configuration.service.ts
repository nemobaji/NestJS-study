import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.checkEnvLoad();
    this.getConfig();
  }

  getConfig(): void {
    const port = this.configService.get<number>('port');
    const dbHost = this.configService.get<string>('DATABASE_HOST');
    const dbPort = this.configService.get<number>('DATABASE_PORT');
    console.log('--- 환경 변수 테스트 ---');
    console.log(port, dbHost, dbPort);
    console.log('----------------------');
  }

  async checkEnvLoad(): Promise<void> {
    await ConfigModule.envVariablesLoaded;
    console.log('환경 변수가 로드되었습니다.');
  }
}
