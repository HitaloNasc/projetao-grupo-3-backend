import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { RankingService } from '../services/ranking.service';
import { RankingDto } from '../data/model/ranking.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rankings')
export class RankingController {
  constructor(private readonly service: RankingService) {}

  // @Get()
  // async getAllRankings(): Promise<RankingDto[]> {
  //   return await this.service.getAllRankings();
  // }

  @Post('/update_rankings')
  @UseInterceptors(FileInterceptor('file'))
  async importCSV(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    return await this.service.processCSV(file);
  }
}