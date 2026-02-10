import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { CustomParseIntPipe } from './pipes/parse-int.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/')
export class PipeTestController {
  constructor() {}
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    return id;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  // 타입스크립트에서 제네릭과 인터페이스에 대한 메타데이터를 저장하지 않기 때문에,
  // 배열을 감싸는 프로퍼티를 가진 전용 클래스를 만들거나,
  // ParseArrayPipe를 사용합니다.
  @Post()
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUserDtos: CreateUserDto[],
  ) {
    console.log(createUserDtos);
    return 'This action adds new users';
  }
  // 또는,
  //   export class CreateUserDtos {
  //   @IsArray() 1. 배열인지 검증
  //   @ValidateNested({ each: true })  2. 배열 내부의 각 항목을 검증하겠다고 선언
  //   @Type(() => CreateUserDto)  3. 배열 안의 객체가 어떤 클래스인지 명시 (가장 중요)
  //   users: CreateUserDto[];
}
