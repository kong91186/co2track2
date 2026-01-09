<<<<<<< HEAD
import { Controller, Get } from '@nestjs/common';

@Controller('co2')
export class Co2Controller {
  @Get()
  getAll() {
    return { message: 'co2 api works' };
  }
}
=======
import { Controller, Get, Post, Body } from '@nestjs/common';
import { firestore } from '../firebase/firebase-admin';

@Controller('co2')
export class Co2Controller {

  // ✅ รับข้อมูลจากเว็บคุณ
  @Post()
  async create(@Body() data: any) {
    await firestore.collection('travel_logs').add(data);
    return { message: 'saved' };
  }

  // ✅ ให้เพื่อนดึงข้อมูลไปใช้
  @Get()
  async getAll() {
    const snapshot = await firestore
      .collection('travel_logs')
      .orderBy('timestamp', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}

>>>>>>> 6edf338e (fix: GET /co2 return firestore data)
