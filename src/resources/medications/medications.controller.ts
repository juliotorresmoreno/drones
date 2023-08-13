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

@Controller('medications')
export class MedicationsController {
  private readonly logger = new Logger(MedicationsController.name);

  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateMedicationDtoSchema))
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
