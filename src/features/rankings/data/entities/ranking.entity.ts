import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IndicatorEntity } from 'src/features/indicator/data/entities/indicator.entity';

@Schema()
export class RankingEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  position: number;

  @Prop({ required: true })
  indicators: Array<IndicatorEntity>;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export const RankingSchema = SchemaFactory.createForClass(RankingEntity);