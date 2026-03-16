import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScrapItemDto {
  @IsString()
  @IsNotEmpty()
  material_name: string;

  @IsNumber()
  @Min(0.1)
  estimated_weight: number;
}

export class CreateScrapBookingDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsOptional()
  @IsString()
  pickup_point?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScrapItemDto)
  items: ScrapItemDto[];

  @IsOptional()
  @IsString()
  status?: string;
}
