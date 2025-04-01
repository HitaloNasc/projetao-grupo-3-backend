import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IndicatorEntity, IndicatorSchema } from './data/entities/indicator.entity';
import { IndicatorController } from './controllers/indicator.controller';
import { IndicatorService } from './services/indicator.service';
import { IndicatorRepository } from './repositories/indicator.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IndicatorEntity.name, schema: IndicatorSchema }]),
  ],
  controllers: [IndicatorController],
  providers: [IndicatorService, IndicatorRepository],
  exports: [IndicatorRepository],
})
export class IndicatorModule {}
