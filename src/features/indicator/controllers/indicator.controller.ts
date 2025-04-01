import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { IndicatorService } from '../services/indicator.service';
import { IndicatorDto } from '../data/model/indicator.dto';

@Controller('indicators')
export class IndicatorController {
  constructor(private readonly service: IndicatorService) {}

  @Get()
  async findAll(): Promise<IndicatorDto[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IndicatorDto> {
    return await this.service.findById(id);
  }

  @Post()
  async create(
    @Body() body: { name: string; description: string },
  ): Promise<IndicatorDto> {
    return await this.service.create(body.name, body.description);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.service.deleteById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; description: string },
  ): Promise<IndicatorDto> {
    return await this.service.update(id, body.name, body.description);
  }
}
