import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { UserService } from 'src/features/users/services/user.service';
import { Readable } from 'stream';
import { RankingRepository } from '../repositories/ranking.repository';
import { IndicatorService } from './../../indicator/services/indicator.service';
import { RankingMapper } from '../data/mappers/ranking.mapper';
import { ICurrentUser } from 'src/features/users/decorators/user.decorator';

@Injectable()
export class RankingService {
  constructor(
    private readonly repository: RankingRepository,
    private readonly userService: UserService,
    private readonly indicatorService: IndicatorService,
  ) {}

  async getRankingByDriverId(
    driverId: string,
    user: ICurrentUser,
  ): Promise<any | null> {
    if (user.role !== 'admin' && user.id !== driverId) {
      throw new ForbiddenException(
        'You do not have permission to access this ranking',
      );
    }

    const rankings = await this.getAllRankings();

    const driverIndex = rankings.findIndex(
      (ranking) => ranking.driverId === driverId,
    );

    return {
      id: rankings[driverIndex].id,
      name: rankings[driverIndex].name,
      score: rankings[driverIndex].score,
      position: rankings[driverIndex].position,
      pointsToNextPosition: this.formatScore(
        rankings[driverIndex - 1]
          ? rankings[driverIndex - 1].score - rankings[driverIndex].score
          : 0,
      ),
      lastRakingPosition: null,
      indicators: rankings[driverIndex].indicators,
    };
  }

  async getAllRankings(): Promise<any[]> {
    const rankingEntities = await this.repository.findAll();
    let rankingDtos = RankingMapper.entityListToDtoList(rankingEntities);
    rankingDtos = rankingDtos.map((ranking) => {
      const score =
        ranking.indicators?.reduce((acc, item) => acc + item.value, 0) || 0;
      return { ...ranking, score: this.formatScore(score) };
    });

    rankingDtos.sort((a, b) => b.score - a.score);

    rankingDtos = rankingDtos.map((ranking, index) => ({
      ...ranking,
      position: index + 1,
      indicators: ranking.indicators.map((indicator) => ({
        ...indicator,
        value: this.formatScore(indicator.value),
      })),
    }));
    return rankingDtos;
  }

  async processCSV(file: Express.Multer.File): Promise<any> {
    const results = [];
    const errors = [];

    // Cria um stream de leitura a partir do buffer do arquivo
    const stream = Readable.from(file.buffer).pipe(csvParser());

    for await (const row of stream) {
      const {
        motorista: driver,
        data: date,
        indicador: indicator,
        valor: score,
      } = row;

      try {
        // Valida a existência do driver
        const currentDriver = await this.userService.findByEmail(driver);

        if (!currentDriver) {
          throw new NotFoundException(`Driver not found: ${driver}`);
        }

        // Valida a existência do indicador
        const currentIndicator =
          await this.indicatorService.findById(indicator);

        if (!currentIndicator) {
          throw new NotFoundException(`Indicator not found: ${indicator}`);
        }

        // Chama a função no repositório para realizar o cálculo
        const calculatedResult = await this.repository.calculateScore({
          driver: currentDriver,
          indicator: currentIndicator,
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

  private formatScore(score: number): number {
    return parseFloat(score.toFixed(2));
  }
}
