import { Controller, Get, Post, Body } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post('enroll')
  create(@Body() dto: CreatePartnerDto) {
    return this.partnersService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.partnersService.findAll();
  }
}
