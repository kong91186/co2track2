import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Co2Controller } from './co2/co2.controller';

@Module({
  imports: [],
  controllers: [AppController, Co2Controller], // ✅ เพิ่มตรงนี้
  providers: [AppService],
})
export class AppModule {}
