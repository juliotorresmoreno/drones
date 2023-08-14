import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Status')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOkResponse({
    description: 'Deliveries',
    schema: {
      type: 'string',
    },
  })
  helloWorld() {
    return this.homeService.helloWorld();
  }
}
