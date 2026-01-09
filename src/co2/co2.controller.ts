import { Controller, Get } from '@nestjs/common';

@Controller('co2')
export class Co2Controller {
  @Get()
  getAll() {
    return { message: 'co2 api works' };
  }
}
