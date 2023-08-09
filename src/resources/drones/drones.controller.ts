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
  NotImplementedException,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto, CreateDroneDtoSchema } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { JoiValidationPipe } from 'src/pipes/joiValidation.pipe';

@Controller('drones')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDroneDtoSchema))
  create(@Body() createDroneDto: CreateDroneDto) {
    return this.dronesService.create(createDroneDto).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  @Get()
  async findAll(@Query('take') take = 10, @Query('skip') skip = 0) {
    return this.dronesService
      .findAll({ skip, take })
      .then(([data, total]) => ({ data, total }))
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dronesService.findOne(+id).catch((err) => {
      throw new NotFoundException();
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDroneDto: UpdateDroneDto) {
    return this.dronesService.update(+id, updateDroneDto).catch((err) => {
      throw new InternalServerErrorException();
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dronesService.remove(+id).catch((err) => {
      throw new InternalServerErrorException();
    });
  }
}
