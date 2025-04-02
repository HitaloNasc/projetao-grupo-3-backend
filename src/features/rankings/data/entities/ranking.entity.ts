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

const RankingSchema = SchemaFactory.createForClass(RankingEntity);

// Middleware para atualizar o score antes de salvar
RankingSchema.pre('save', function (next) {
  // Calcula a soma dos valores dos indicadores
  this.score = this.indicators.reduce((sum, indicator) => sum + indicator.value, 0);
  next();
});

export { RankingSchema };