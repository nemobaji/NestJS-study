import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  // 클래스의 인스턴스로 변환하는 생성자
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
