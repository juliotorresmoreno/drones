import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  InternalServerErrorException,
  UsePipes,
  Logger,
  HttpException,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto, CreateDroneDtoSchema } from './dto/create-drone.dto';
import { UpdateDroneDto, UpdateDroneDtoSchema } from './dto/update-drone.dto';
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
import { DroneEntity, DronesEntity } from './entities/drones.entity';

@Controller('drones')
@ApiTags('Api')
export class DronesController {
  private readonly logger = new Logger(DronesController.name);

  constructor(private readonly dronesService: DronesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDroneDtoSchema))
  @ApiHeader({
    name: 'content-type',
    enum: ['application/json'],
    allowEmptyValue: false,
    required: true,
    example: 'application/json',
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: DroneEntity,
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
    type: CreateDroneDto,
  })
  create(@Body() createDroneDto: CreateDroneDto) {
    return this.dronesService.create(createDroneDto).catch((err) => {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    });
  }

  @Get()
  @ApiOkResponse({
    description: 'Drones',
    type: DronesEntity,
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
    return this.dronesService.findAll({ skip, take }).catch((err) => {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new NotFoundException();
    });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Drone',
    type: DroneEntity,
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
    return this.dronesService
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
        throw new NotFoundException();
      });
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateDroneDtoSchema))
  @ApiHeader({
    name: 'content-type',
    enum: ['application/json'],
    allowEmptyValue: false,
    required: true,
    example: 'application/json',
  })
  @ApiOkResponse({
    description: 'Updated',
    type: DroneEntity,
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
    type: UpdateDroneDto,
  })
  update(@Param('id') id: string, @Body() updateDroneDto: UpdateDroneDto) {
    return this.dronesService.update(+id, updateDroneDto).catch((err) => {
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
    return this.dronesService
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
