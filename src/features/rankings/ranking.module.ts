import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingEntity, RankingSchema } from './data/entities/ranking.entity';
import { RankingController } from './controllers/ranking.controller';
import { RankingService } from './services/ranking.service';
import { RankingRepository } from './repositories/ranking.repository';
import { UserModule } from '../users/user.module';
import { IndicatorModule } from '../indicator/indicator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RankingEntity.name, schema: RankingSchema }]),
    UserModule,
    IndicatorModule,
  ],
  controllers: [RankingController],
  providers: [RankingService, RankingRepository],
  exports: [RankingRepository],
})
export class RankingModule {}