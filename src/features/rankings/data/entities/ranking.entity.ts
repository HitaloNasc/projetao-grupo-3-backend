import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RankingEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  driverId: string;

  @Prop({ required: true })
  indicators: Array<{
    id: string;
    name: string;
    value: number;
  }>;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export const RankingSchema = SchemaFactory.createForClass(RankingEntity);
