import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TestResponse {
  @ApiProperty({
    example: 'Lorem Ipsum dolor set amet',
  })
  public message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@Injectable()
export class AppService {
  getHello(): TestResponse {
    return new TestResponse('Hello world');
  }
}
