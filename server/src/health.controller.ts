import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class HealthController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  get() {
    return 'ok';
  }
}
