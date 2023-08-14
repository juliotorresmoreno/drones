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
  NotFoundException,
  Logger,
  HttpException,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import {
  CreateMedicationDto,
  CreateMedicationDtoSchema,
} from './dto/create-medication.dto';
import {
  UpdateMedicationDto,
  UpdateMedicationDtoSchema,
} from './dto/update-medication.dto';
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
import { ErrorResponse, SuccessResponse } from '../../../src/helper/http.responses';
import { MedicationEntity } from './entities/medication.entity';

@Controller('medications')
@ApiTags('Api')
export class MedicationsController {
  private readonly logger = new Logger(MedicationsController.name);

  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateMedicationDtoSchema))
  @ApiHeader({
    name: 'content-type',
    enum: ['application/json'],
    allowEmptyValue: false,
    required: true,
    example: 'application/json',
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: MedicationEntity,
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
    type: CreateMedicationDto,
  })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto).catch((err) => {
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
    type: MedicationEntity,
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
    return this.medicationsService.findAll().catch((err) => {
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
    type: MedicationEntity,
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
    return this.medicationsService
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
  @UsePipes(new JoiValidationPipe(UpdateMedicationDtoSchema))
  @ApiHeader({
    name: 'content-type',
    enum: ['application/json'],
    allowEmptyValue: false,
    required: true,
    example: 'application/json',
  })
  @ApiOkResponse({
    description: 'Updated',
    type: MedicationEntity,
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
    type: UpdateMedicationDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService
      .update(+id, updateMedicationDto)
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
    return this.medicationsService
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
