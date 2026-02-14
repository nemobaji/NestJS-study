import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { getQueueConfig } from './config/queue.config';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getQueueConfig,
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'analysis' }),
  ],
  controllers: [AppController],
  providers: [AppService, AnalysisService],
})
export class AppModule {}
