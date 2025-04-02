import { RankingEntity } from '../entities/ranking.entity';
import { RankingDto } from '../model/ranking.dto';

export class RankingMapper {
  public static entityToDto(entity: RankingEntity): RankingDto | null {
    if (!entity) return null;

    const dto = new RankingDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.score = entity.score;
    dto.position = entity.position;
    dto.indicators = entity.indicators
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  public static entityListToDtoList(entities: RankingEntity[]): RankingDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.entityToDto(entity));
  }
}