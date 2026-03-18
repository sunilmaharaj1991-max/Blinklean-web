import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateScrapBookingDto } from './dto/create-scrap-booking.dto';

interface ZoneData {
  pincode: string;
  is_active: boolean;
  scrap_service_available: boolean;
}

@Injectable()
export class BookingsService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private get bookingsCollection() {
    return this.firebaseService.getCollection('bookings');
  }

  private get zonesCollection() {
    return this.firebaseService.getCollection('zones');
  }

  private get usersCollection() {
    return this.firebaseService.getCollection('users');
  }

  async createScrapBooking(phone: string, dto: CreateScrapBookingDto) {
    const {
      pickup_address,
      pincode,
      selected_materials,
      estimated_weight,
      predicted_price,
      pickup_date,
    } = dto;

    // 1. Validate Date (must be future)
    const bookingDate = new Date(pickup_date);
    if (bookingDate <= new Date()) {
      throw new BadRequestException('Pickup date must be in the future');
    }

    // 2. Anti-spam/Duplicate prevent caching (10 seconds)
    const cacheKey = `booking_spam_${phone}`;
    const recentBooking = await this.cacheManager.get(cacheKey);
    if (recentBooking) {
      throw new ConflictException(
        'Please wait before requesting another booking',
      );
    }

    // 3. Check service zone availability
    const zoneSnapshot = await this.zonesCollection
      .where('pincode', '==', pincode)
      .where('is_active', '==', true)
      .limit(1)
      .get();

    if (zoneSnapshot.empty) {
      throw new BadRequestException(
        'Service is not available in your area yet',
      );
    }

    const zone = zoneSnapshot.docs[0].data() as ZoneData;

    if (!zone.scrap_service_available) {
      throw new BadRequestException(
        'Scrap service is currently not available for this pincode',
      );
    }

    // 4. Get User
    const userSnapshot = await this.usersCollection
      .where('phone_number', '==', phone)
      .limit(1)
      .get();

    let userId: string;

    if (userSnapshot.empty) {
      // Create new user in users collection
      const newUser = {
        phone_number: phone,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const userRef = await this.usersCollection.add(newUser);
      userId = userRef.id;
    } else {
      const userDoc = userSnapshot.docs[0];
      userId = userDoc.id;
    }

    // 5. Create Booking
    const bookingData = {
      userId,
      pickup_address,
      pincode,
      selected_materials,
      estimated_weight,
      predicted_price,
      pickup_date,
      status: 'scheduled',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const bookingRef = await this.bookingsCollection.add(bookingData);

    // 6. Lock submissions for this user for 10 seconds
    await this.cacheManager.set(cacheKey, 'locked', 10);

    return {
      message: 'Scrap pickup scheduled successfully',
      bookingId: bookingRef.id,
      status: bookingData.status,
    };
  }
}
