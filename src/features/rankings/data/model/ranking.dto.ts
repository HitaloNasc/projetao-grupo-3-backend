import { IsString, IsNotEmpty, IsOptional, IsDate, IsUUID, IsNumber, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { IndicatorDto } from 'src/features/indicator/data/model/indicator.dto';

export class RankingDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsArray()
  @IsNotEmpty()
  indicators: Array<IndicatorDto>;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  updatedAt?: Date;
}