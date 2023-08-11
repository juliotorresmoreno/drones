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

@Controller('drones')
export class DronesController {
  private readonly logger = new Logger(DronesController.name);

  constructor(private readonly dronesService: DronesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDroneDtoSchema))
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
  findOne(@Param('id') id: string) {
    return this.dronesService.findOne(+id).catch((err) => {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new NotFoundException();
    });
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateDroneDtoSchema))
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
