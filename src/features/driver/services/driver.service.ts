import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/features/users/services/user.service';
import { ICurrentUser } from '../../users/decorators/user.decorator';
import { DriverEntity } from '../data/entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(DriverEntity.name)
    private driverModel: Model<DriverEntity>,
    private userService: UserService,
  ) {}

  async create(
    createDriverDto: Partial<DriverEntity>,
    user: ICurrentUser,
  ): Promise<DriverEntity> {
    const { name, email } = createDriverDto;

    if (!name || !email) {
      throw new Error('Nome e e-mail são obrigatórios.');
    }

    const currentYear = new Date().getFullYear();
    const initialPassword = `${name}@${currentYear}`;

    const newUser = await this.userService.create({
      email,
      password: initialPassword,
      mustChangePassword: true,
      name,
      confirmPassword: initialPassword,
    });

    const createdDriver = new this.driverModel({
      ...createDriverDto,
      userId: newUser.id,
      createdBy: user.id,
    });

    return createdDriver.save();
  }

  async findAll(user: ICurrentUser): Promise<DriverEntity[]> {
    return this.driverModel.find({ institutionId: user.institutionId }).exec();
  }

  async findOne(id: string, user: ICurrentUser): Promise<DriverEntity | null> {
    return this.driverModel
      .findOne({ _id: id, institutionId: user.institutionId })
      .exec();
  }

  async update(
    id: string,
    updateDriverDto: Partial<DriverEntity>,
    user: ICurrentUser,
  ): Promise<DriverEntity | null> {
    return this.driverModel
      .findOneAndUpdate(
        { _id: id, institutionId: user.institutionId },
        updateDriverDto,
        { new: true },
      )
      .exec();
  }

  async remove(id: string, user: ICurrentUser): Promise<DriverEntity | null> {
    return this.driverModel
      .findOneAndDelete({ _id: id, institutionId: user.institutionId })
      .exec();
  }
}
