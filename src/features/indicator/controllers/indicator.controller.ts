import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { IndicatorService } from '../services/indicator.service';
import { IndicatorDto } from '../data/model/indicator.dto';
import { Roles } from 'src/features/auth/decorators/roles.decorator';

@Controller('indicators')
export class IndicatorController {
  constructor(private readonly service: IndicatorService) {}

  @Get()
  @Roles('admin')
  async findAll(): Promise<IndicatorDto[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles('admin')
  async findById(@Param('id') id: string): Promise<IndicatorDto> {
    return await this.service.findById(id);
  }

  @Post()
  @Roles('admin')
  async create(
    @Body() body: { name: string; description: string, weight: number },
  ): Promise<IndicatorDto> {
    return await this.service.create(body.name, body.description, body.weight);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.service.deleteById(id);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; description: string },
  ): Promise<IndicatorDto> {
    return await this.service.update(id, body.name, body.description);
  }
}
