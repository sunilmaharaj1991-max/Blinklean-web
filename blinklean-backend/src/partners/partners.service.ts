import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private get collection() {
    return this.firebaseService.getCollection('partners');
  }

  async create(dto: CreatePartnerDto): Promise<any> {
    const partnerData = {
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const docRef = await this.collection.add(partnerData);
    return { id: docRef.id, ...partnerData };
  }

  async findAll(): Promise<any[]> {
    const snapshot = await this.collection.orderBy('created_at', 'desc').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
