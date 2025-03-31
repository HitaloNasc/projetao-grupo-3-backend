import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversController } from './controllers/driver.controller';
import { DriversService } from './services/driver.service';
import { DriverEntity, DriverSchema } from './data/entities/driver.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DriverEntity.name, schema: DriverSchema },
    ]),
    UserModule,
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriverModule {}
