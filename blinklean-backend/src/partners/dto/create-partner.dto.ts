import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  serviceType: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
