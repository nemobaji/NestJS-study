import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  // 동적 크론 잡을 위해 SchedulerRegistry를 주입합니다.
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(AppService.name);

  // Dynamic API를 통해 선언적 크론잡을 제어하기 위해 이름을 할당합니다.
  @Cron('45 * * * * *', { name: 'notification' })
  handleCron45s() {
    this.logger.debug('현재 초가 45일 때 호출됩니다');
  }

  // 해당 잡에 접근하려면 다음과 같이 합니다.
  async stopJob(): Promise<void> {
    const job = this.schedulerRegistry.getCronJob('notification');
    await job.stop();
    console.log(job.lastDate());
  }

  // 새로운 크론잡을 생성하려면 다음과 같이 합니다.
  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  // 새로운 인터벌을 생성하려면 다음과 같이 합니다.
  addInterval(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})`);
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  // 새로운 타임아웃을 생성하려면 다음과 같이 합니다.
  addTimeout(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
    };

    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
  }
}
