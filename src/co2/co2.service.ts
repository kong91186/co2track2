import { Injectable } from '@nestjs/common';

@Injectable()
export class Co2Service {
  findAll() {
    return [{ ok: true }];
  }

  create(data: any) {
    return data;
  }
}

