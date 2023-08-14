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
  NotFoundException,
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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse, SuccessResponse } from 'src/helper/http.responses';
import { DeliveryEntity } from './entities/delivery.entity';

@Controller('deliveries')
@ApiTags('Api')
export class DeliveriesController {
  private readonly logger = new Logger(DeliveriesController.name);

  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDeliveryDtoSchema))
  @ApiHeader({
    name: 'content-type',
    enum: ['application/json'],
    allowEmptyValue: false,
    required: true,
    example: 'application/json',
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: DeliveryEntity,
  })
  @ApiBadRequestResponse({
    description: 'BadRequest',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError',
    type: ErrorResponse,
  })
  @ApiBody({
    required: true,
    type: CreateDeliveryDto,
  })
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
  @ApiOkResponse({
    description: 'Deliveries',
    type: DeliveryEntity,
  })
  @ApiBadRequestResponse({
    description: 'BadRequest',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError',
    type: ErrorResponse,
  })
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
  @ApiOkResponse({
    description: 'Delivery',
    type: DeliveryEntity,
  })
  @ApiBadRequestResponse({
    description: 'BadRequest',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError',
    type: ErrorResponse,
  })
  findOne(@Param('id') id: string) {
    return this.deliveriesService
      .findOne(+id)
      .then((result) => {
        if (!result) {
          throw new NotFoundException();
        }
        return result;
      })
      .catch((err) => {
        this.logger.error(err);
        if (err instanceof HttpException) {
          throw err;
        }
        throw new InternalServerErrorException();
      });
  }

  @Patch(':id/transition')
  @UsePipes(new JoiValidationPipe(UpdateDeliveryDtoSchema))
  @ApiHeader({
    name: 'content-type',
    enum: ['application/json'],
    allowEmptyValue: false,
    required: true,
    example: 'application/json',
  })
  @ApiOkResponse({
    description: 'Updated',
    type: DeliveryEntity,
  })
  @ApiBadRequestResponse({
    description: 'BadRequest',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError',
    type: ErrorResponse,
  })
  @ApiBody({
    required: true,
    type: UpdateDeliveryDto,
  })
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
  @ApiOkResponse({
    description: 'Deleted',
    type: SuccessResponse,
  })
  @ApiBadRequestResponse({
    description: 'BadRequest',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError',
    type: ErrorResponse,
  })
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
