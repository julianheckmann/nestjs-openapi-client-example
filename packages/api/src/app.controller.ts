import { Controller, Get } from '@nestjs/common';
import { AppService, TestResponse } from './app.service';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @ApiExtraModels(TestResponse)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(TestResponse),
    },
  })
  @Get('test')
  getTest() {
    return this.appService.getHello();
  }

  @ApiExtraModels(TestResponse)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(TestResponse),
    },
  })
  @Get('another')
  getAnother(): TestResponse {
    const res = this.appService.getHello();
    console.log(res);
    return res;
  }
}
