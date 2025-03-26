import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverEntity } from '../data/entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(DriverEntity.name)
    private driverModel: Model<DriverEntity>,
  ) {}

  async create(createDriverDto: Partial<DriverEntity>): Promise<DriverEntity> {
    const createdDriver = new this.driverModel(createDriverDto);
    return createdDriver.save();
  }

  async findAll(): Promise<DriverEntity[]> {
    return this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<DriverEntity | null> {
    return this.driverModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDriverDto: Partial<DriverEntity>,
  ): Promise<DriverEntity | null> {
    return this.driverModel
      .findByIdAndUpdate(id, updateDriverDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<DriverEntity | null> {
    return this.driverModel.findByIdAndDelete(id).exec();
  }
}
