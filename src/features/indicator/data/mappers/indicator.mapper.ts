import { IndicatorEntity } from '../entities/indicator.entity';
import { IndicatorDto } from '../model/indicator.dto';

export class IndicatorMapper {
  public static entityToDto(entity: IndicatorEntity): IndicatorDto | null {
    if (!entity) return null;

    const dto = new IndicatorDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.weight = entity.weight;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  public static entityListToDtoList(entities: IndicatorEntity[]): IndicatorDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.entityToDto(entity));
  }
}
