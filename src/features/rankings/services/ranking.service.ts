import { Injectable, BadRequestException } from '@nestjs/common';
import { RankingRepository } from '../repositories/ranking.repository';
import { RankingDto } from '../data/model/ranking.dto';
import { RankingMapper } from '../data/mappers/ranking.mapper';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class RankingService {
  constructor(private readonly repository: RankingRepository) {}
}