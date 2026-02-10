import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

// 커스텀 파이프를 만들기 위해 PipeTransform을 상속받습니다.
@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const transformedValue = parseInt(value, 10);
    if (isNaN(transformedValue)) {
      throw new BadRequestException('Validation failed');
    }
    return transformedValue;
  }
}
