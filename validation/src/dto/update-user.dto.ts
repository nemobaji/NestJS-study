import { IntersectionType, OmitType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// 생성 타입에서 일부 속성만 선택할 수 있습니다.
export class UpdateUserDto1 extends PickType(CreateUserDto, [
  'email',
] as const) {}

// 생성 타입에서 일부 속성만 제외할 수 있습니다.
export class UpdateUserDto2 extends OmitType(CreateUserDto, [
  'password',
] as const) {}

// 두 타입의 모든 속성을 결합할 수 있습니다.
export class UpdateUserDto3 extends IntersectionType(
  UpdateUserDto1,
  UpdateUserDto2,
) {}
