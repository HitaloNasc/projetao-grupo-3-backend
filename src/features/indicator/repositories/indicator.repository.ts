import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndicatorEntity } from '../data/entities/indicator.entity';
import { logger } from 'src/common/utils/logger';

@Injectable()
export class IndicatorRepository {
  constructor(
    @InjectModel(IndicatorEntity.name)
    private model: Model<IndicatorEntity>,
  ) {}

  public async create(
    name: string,
    description: string,
    weight: number,
  ): Promise<IndicatorEntity> {
    const newIndicator = new this.model({ name, description, weight });
    await newIndicator.save();
    return newIndicator;
  }

  public async findAll(): Promise<IndicatorEntity[]> {
    return await this.model.find().exec();
  }

  public async findById(id: string): Promise<IndicatorEntity | null> {
    logger.log('repository - indicator - findById');
    logger.dir({ id });
    return await this.model.findById(id).exec();
  }

  public async deleteById(id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id: id });
  }

  public async update(entity: IndicatorEntity): Promise<IndicatorEntity> {
    return await this.model
      .findByIdAndUpdate(entity.id, entity, { new: true })
      .exec();
  }
}
