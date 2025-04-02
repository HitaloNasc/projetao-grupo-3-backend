import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class RankingDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  driverId: string;

  @IsNumber()
  @IsNotEmpty()
  score?: number;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsArray()
  @IsNotEmpty()
  indicators: Array<{
    id: string;
    name: string;
    value: number;
  }>;


  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  updatedAt?: Date;
}