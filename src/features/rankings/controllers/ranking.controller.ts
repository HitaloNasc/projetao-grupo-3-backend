import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/features/auth/decorators/roles.decorator';
import { RankingDto } from '../data/model/ranking.dto';
import { RankingService } from '../services/ranking.service';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/features/users/decorators/user.decorator';

@Controller('rankings')
export class RankingController {
  constructor(private readonly service: RankingService) {}

  @Get()
  @Roles('admin')
  async getAllRankings(): Promise<RankingDto[]> {
    return await this.service.getAllRankings();
  }

  @Get('/:driverId')
  async getRankingByDriverId(
    @Param('driverId') driverId: string,
    @CurrentUser() user: ICurrentUser,
  ): Promise<RankingDto | null> {
    return await this.service.getRankingByDriverId(driverId, user);
  }

  @Post('/update_rankings')
  @UseInterceptors(FileInterceptor('file'))
  async importCSV(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return await this.service.processCSV(file);
  }
}
