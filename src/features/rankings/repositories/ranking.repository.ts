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
}