import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DriversService } from '../services/driver.service';
import { DriverEntity } from '../data/entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() createDriverDto: Partial<DriverEntity>): Promise<DriverEntity> {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  findAll(): Promise<DriverEntity[]> {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DriverEntity | null> {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDriverDto: Partial<DriverEntity>,
  ): Promise<DriverEntity | null> {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DriverEntity | null> {
    return this.driversService.remove(id);
  }
}
