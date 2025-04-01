import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'drivers'
})
export class Driver extends Document {
  @Prop({ type: String, default: () => new mongoose.Types.ObjectId().toString() })
  _id: string;

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

  @Prop({ required: false })
  picture?: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
