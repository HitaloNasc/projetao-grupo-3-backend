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
import { Roles } from 'src/features/auth/decorators/roles.decorator';
import { CurrentUser, ICurrentUser } from '../../users/decorators/user.decorator';
import { DriverEntity } from '../data/entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @Roles('admin')
  async create(
    @Body() createDriverDto: Partial<DriverEntity>,
    @CurrentUser() user: ICurrentUser
  ): Promise<DriverEntity> {
    return this.driversService.create(createDriverDto, user);
  }

  @Get()
  @Roles('admin')
  async findAll(
    @CurrentUser() user: ICurrentUser
  ): Promise<DriverEntity[]> {
    return this.driversService.findAll(user);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser
  ): Promise<DriverEntity | null> {
    return this.driversService.findOne(id, user);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: Partial<DriverEntity>,
    @CurrentUser() user: ICurrentUser
  ): Promise<DriverEntity | null> {
    return this.driversService.update(id, updateDriverDto, user);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser
  ): Promise<DriverEntity | null> {
    return this.driversService.remove(id, user);
  }
}
