import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  helloWorld() {
    return 'OK!';
  }
}
