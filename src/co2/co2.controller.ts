import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Co2Service } from './co2.service';

@Controller('co2')
export class Co2Controller {
  constructor(private readonly co2Service: Co2Service) {}

  // ===============================
  // ดึงข้อมูลดิบทั้งหมด
  // GET /co2
  // ===============================
  @Get()
  async getAll() {
    return this.co2Service.findAll();
  }

  // ===============================
  // บันทึกข้อมูลจาก frontend
  // POST /co2
  // ===============================
  @Post()
  async create(@Body() data: any) {
    return this.co2Service.create(data);
  }

  // ===============================
  // สรุปรายเดือน / รายปี
  // GET /co2/summary?year=2026&month=1
  // ===============================
  @Get('summary')
  async summary(
    @Query('year') year: string,
    @Query('month') month?: string,
  ) {
    return this.co2Service.getSummary(
      Number(year),
      month ? Number(month) : undefined,
    );
  }
}

