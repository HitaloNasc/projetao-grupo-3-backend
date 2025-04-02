import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DriverEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  branch: string;

  @Prop({ default: null })
  picture?: string;
}

export const DriverSchema = SchemaFactory.createForClass(DriverEntity);
