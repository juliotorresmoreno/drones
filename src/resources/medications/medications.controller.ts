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
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateMedicationDtoSchema))
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  @Get()
  findAll(@Query('take') take = 10, @Query('skip') skip = 0) {
    return this.medicationsService.findAll().catch((err) => {
      throw new NotFoundException();
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id).catch((err) => {
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
        throw new InternalServerErrorException();
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService
      .remove(+id)
      .then(() => ({ success: true }))
      .catch((err) => {
        throw new InternalServerErrorException();
      });
  }
}
