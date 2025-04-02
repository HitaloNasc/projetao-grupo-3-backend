import { Injectable, BadRequestException } from '@nestjs/common';
import { RankingRepository } from '../repositories/ranking.repository';
import { RankingDto } from '../data/model/ranking.dto';
import { RankingMapper } from '../data/mappers/ranking.mapper';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class RankingService {
  constructor(private readonly repository: RankingRepository) {}

  async processCSV(file: Express.Multer.File): Promise<any> {
    const results = [];
    const errors = [];
    const stream = fs.createReadStream(file.path).pipe(csvParser());
  
    for await (const row of stream) {
      const { driver, date, indicator, score } = row;
  
      try {
        // Valida a existência do driver
        const driverEntity = await this.repository.findById(driver);
        if (!driverEntity) {
          throw new Error(`Driver not found: ${driver}`);
        }
  
        // Valida a existência do indicador
        const indicatorEntity = await this.repository.findById(indicator);
        if (!indicatorEntity) {
          throw new Error(`Indicator not found: ${indicator}`);
        }
  
        // Chama a função no repositório para realizar o cálculo
        const calculatedResult = await this.repository.calculateScore({
          driver: driverEntity,
          indicator: indicatorEntity,
          date,
          score: parseFloat(score),
        });
  
        // Adiciona o resultado ao array de resultados
        results.push(calculatedResult);
      } catch (error) {
        // Registra o erro e continua processando as próximas linhas
        errors.push({
          row,
          error: error.message,
        });
      }
    }
  
    // Retorna um relatório com os resultados e os erros
    return {
      processed: results,
      errors,
    };
  }
}