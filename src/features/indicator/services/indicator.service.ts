import { Injectable, BadRequestException } from '@nestjs/common';
import { IndicatorRepository } from '../repositories/indicator.repository';
import { IndicatorDto } from '../data/model/indicator.dto';
import { IndicatorMapper } from '../data/mappers/indicator.mapper';

@Injectable()
export class IndicatorService {
  constructor(private readonly repository: IndicatorRepository) {}

  public async findAll(): Promise<IndicatorDto[]> {
    const entities = await this.repository.findAll();
    return IndicatorMapper.entityListToDtoList(entities);
  }

  public async findById(id: string): Promise<IndicatorDto> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new BadRequestException('Indicator not found');
    return IndicatorMapper.entityToDto(entity);
  }

  public async create(name: string, description: string): Promise<IndicatorDto> {
    const entity = await this.repository.create(name, description);
    return IndicatorMapper.entityToDto(entity);
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.deleteById(id);
  }

  public async update(
    id: string,
    name: string,
    description: string,
  ): Promise<IndicatorDto> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new BadRequestException('Indicator not found');
    }
  
    entity.name = name;
    entity.description = description;
    entity.updatedAt = new Date();
  
    const updatedEntity = await this.repository.update(entity);
    return IndicatorMapper.entityToDto(updatedEntity);
  }
}
