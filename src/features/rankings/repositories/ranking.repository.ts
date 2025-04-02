import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankingEntity } from '../data/entities/ranking.entity';

@Injectable()
export class RankingRepository {
  constructor(
    @InjectModel(RankingEntity.name)
    private model: Model<RankingEntity>,
  ) {}

  public async calculateScore(data: {
    driver: any;
    indicator: any;
    date: string;
    score: number;
  }): Promise<any> {
    // Encontra o ranking que contém o driver
    const rankingEntry = await this.model.findOne({ driver: data.driver.id });
  
    if (!rankingEntry) {
      throw new Error(`Ranking not found for driver: ${data.driver.id}`);
    }
  
    // Encontra o indicador dentro do ranking
    const rankingIndicatorIndex = rankingEntry.indicators.findIndex(
      (indicator) => indicator.id === data.indicator.id,
    );
  
    if (rankingIndicatorIndex === -1) {
      throw new Error(`Indicator not found in ranking for driver: ${data.driver.id}`);
    }
  
    // Realiza o cálculo: soma o value atual com (score * weight do indicador)
    const calculatedScore =
      rankingEntry.indicators[rankingIndicatorIndex].value +
      data.score * data.indicator.weight;
  
    // Atualiza o value do indicador no array indicators
    rankingEntry.indicators[rankingIndicatorIndex].value = calculatedScore;
  
    // Salva o ranking atualizado no banco de dados
    await rankingEntry.save();
  
    // Retorna o resultado do cálculo
    return {
      driver: data.driver.id,
      indicator: data.indicator.id,
      date: data.date,
      originalScore: data.score,
      calculatedScore,
    };
  }
}