import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AnalysisService {
  constructor(
    private logger: Logger,
    @InjectQueue('analysis') private readonly analysisQueue: Queue,
  ) {}

  async addJob(content: string): Promise<any> {
    const job = await this.analysisQueue.add(
      'comment-analysis',
      {
        content,
      },
      { delay: 3000 },
    );
    return job.id;
  }
}
