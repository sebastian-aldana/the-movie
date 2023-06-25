import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healtCheck() {
    return { status: 'ok' };
  }
}
