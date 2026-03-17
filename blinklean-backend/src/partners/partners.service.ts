import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async create(dto: CreatePartnerDto): Promise<Partner> {
    const partner = this.partnerRepository.create(dto);
    return this.partnerRepository.save(partner);
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find({
      order: { created_at: 'DESC' },
    });
  }
}
