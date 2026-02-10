import { Module } from '@nestjs/common';
import { CustomParseIntPipe } from './pipes/parse-int.pipe';
import { PipeTestController } from './pipe-test.controller';

@Module({
  imports: [],
  controllers: [PipeTestController],
  providers: [CustomParseIntPipe],
})
export class AppModule {}
