import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankingEntity } from '../data/entities/ranking.entity';
import { UserDto } from 'src/features/users/data/model/user.dto';
import { IndicatorDto } from 'src/features/indicator/data/model/indicator.dto';

@Injectable()
export class RankingRepository {
  constructor(
    @InjectModel(RankingEntity.name)
    private model: Model<RankingEntity>,
  ) {}

  public async calculateScore(data: {
    driver: UserDto;
    indicator: IndicatorDto;
    date: string;
    score: number;
  }): Promise<RankingEntity> {
    // Encontra o ranking que contém o driver
    let rankingEntry = await this.model.findOne({ driverId: data.driver.id });

    if (!rankingEntry) {
      rankingEntry = await this.model.create({
        name: data.driver.name,
        driverId: data.driver.id,
        indicators: [
          {
            id: data.indicator.id,
            name: data.indicator.name,
            value: data.score * data.indicator.weight,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Encontra o indicador dentro do ranking
    const rankingIndicatorIndex = rankingEntry.indicators.findIndex(
      (indicator) => indicator.id === data.indicator.id,
    );

    if (rankingIndicatorIndex === -1) {
      rankingEntry.indicators.push({
        id: data.indicator.id,
        name: data.indicator.name,
        value: data.score * data.indicator.weight,
      });
    } else {
      // Realiza o cálculo: soma o value atual com (score * weight do indicador)
      const calculatedScore =
        rankingEntry.indicators[rankingIndicatorIndex].value +
        data.score * data.indicator.weight;

      // Atualiza o value do indicador no array indicators
      rankingEntry.indicators[rankingIndicatorIndex].value = calculatedScore;
    }

    // Salva o ranking atualizado no banco de dados
    await rankingEntry.save();

    // Retorna o resultado do cálculo
    return rankingEntry;
  }

  public async findAll(): Promise<RankingEntity[]> {
    return this.model.find().exec();
  }
}
