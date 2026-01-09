import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Co2Controller } from './co2/co2.controller';
 HEAD

@Module({
  imports: [],
  controllers: [AppController, Co2Controller], // ✅ เพิ่มตรงนี้
  providers: [AppService],

import { Co2Service } from './co2/co2.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    Co2Controller,
  ],
  providers: [
    AppService,
    Co2Service,
  ],
  6edf338e (fix: GET /co2 return firestore data)
})
export class AppModule {}
