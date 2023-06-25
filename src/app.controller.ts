import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: `Health check service for performing a comprehensive health check of the entire application`,
  })
  healtCheck() {
    return this.appService.healtCheck();
  }
}
