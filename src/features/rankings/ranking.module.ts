import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingEntity, RankingSchema } from './data/entities/ranking.entity';
import { RankingController } from './controllers/ranking.controller';
import { RankingService } from './services/ranking.service';
import { RankingRepository } from './repositories/ranking.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RankingEntity.name, schema: RankingSchema }]),
  ],
  controllers: [RankingController],
  providers: [RankingService, RankingRepository],
  exports: [RankingRepository],
})
export class RankingModule {}