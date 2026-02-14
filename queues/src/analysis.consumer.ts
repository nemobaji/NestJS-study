import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('analysis')
export class AnalysisConsumer extends WorkerHost {
  private readonly logger = new Logger(AnalysisConsumer.name);
  constructor() {
    super();
  }

  async process(job: Job<{ content: string }>): Promise<any> {
    const { content } = job.data;
    this.logger.debug(`${job.id}번 작업 시작: ${content.substring(0, 20)}...`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const analysisResult = {
        length: content.length,
        wordCount: content.split(' ').length,
        processedAt: new Date().toISOString(),
      };

      this.logger.debug(`${job.id}번 작업 완료`);

      return analysisResult;
    } catch (error) {
      this.logger.error(`${job.id}번 작업 처리 중 오류 발생: ${error}`);
      throw error;
    }
  }
}
