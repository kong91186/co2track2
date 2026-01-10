import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase-admin';

@Injectable()
export class Co2Service {

  // ✅ 1) ข้อมูลดิบทั้งหมด (ให้เพื่อนดึงไปใช้ / export excel)
  async findAll() {
    const snap = await firestore
      .collection('travel_logs')
      .orderBy('timestamp', 'desc')
      .get();

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // ✅ 2) รับข้อมูลจากเว็บคุณแล้วบันทึก
  async create(data: any) {
    const now = new Date();

    const record = {
      timestamp: now,
      year: now.getFullYear(),        // 🔑 ใช้ summary รายปี
      month: now.getMonth() + 1,      // 🔑 ใช้ summary รายเดือน (1–12)

      userType: data.userType,
      organizationType: data.organizationType,
      vehicleType: data.vehicleType,

      origin: data.origin,
      destination: data.destination,
      distance_km: data.distance_km,

      co2_kg: data.co2_kg,            // ❗ frontend คำนวณมาแล้ว
    };

    await firestore.collection('travel_logs').add(record);
    return { ok: true };
  }

  // ✅ 3) ⭐ สรุปรายเดือน / รายปี (ของใหม่)
  async getSummary(year: number, month?: number) {
    const snap = await firestore.collection('travel_logs').get();

    let totalTrips = 0;
    let totalDistance = 0;
    let totalCO2 = 0;

    snap.docs.forEach(doc => {
      const data = doc.data();

      if (data.year !== year) return;
      if (month && data.month !== month) return;

      totalTrips++;
      totalDistance += data.distance_km || 0;
      totalCO2 += data.co2_kg || 0;
    });

    return {
      year,
      month: month ?? 'all',
      totalTrips,
      totalDistanceKm: Number(totalDistance.toFixed(2)),
      totalCO2kg: Number(totalCO2.toFixed(2)),
    };
  }
}



