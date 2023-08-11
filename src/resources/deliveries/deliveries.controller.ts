import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  InternalServerErrorException,
  Logger,
  HttpException,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import {
  CreateDeliveryDto,
  CreateDeliveryDtoSchema,
} from './dto/create-delivery.dto';
import {
  UpdateDeliveryDto,
  UpdateDeliveryDtoSchema,
} from './dto/update-delivery.dto';
import { JoiValidationPipe } from '../../pipes/joiValidation.pipe';

@Controller('deliveries')
export class DeliveriesController {
  private readonly logger = new Logger(DeliveriesController.name);

  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDeliveryDtoSchema))
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto).catch((err) => {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    });
  }

  @Get()
  findAll(@Query('take') take = 10, @Query('skip') skip = 0) {
    return this.deliveriesService
      .findAll({
        skip,
        take,
      })
      .catch((err) => {
        this.logger.error(err);
        if (err instanceof HttpException) {
          throw err;
        }
        throw new InternalServerErrorException();
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id).catch((err) => {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    });
  }

  @Patch(':id/transition')
  @UsePipes(new JoiValidationPipe(UpdateDeliveryDtoSchema))
  transition(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService
      .transition(+id, updateDeliveryDto)
      .catch((err) => {
        this.logger.error(err);
        if (err instanceof HttpException) {
          throw err;
        }
        throw new InternalServerErrorException();
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService
      .remove(+id)
      .then(() => ({ success: true }))
      .catch((err) => {
        this.logger.error(err);
        if (err instanceof HttpException) {
          throw err;
        }
        throw new InternalServerErrorException();
      });
  }
}
