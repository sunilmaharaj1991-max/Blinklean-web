import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { FirebaseService } from '../firebase/firebase.service';

interface ServiceData {
  id: string;
  name: string;
  category: string;
  description: string;
  app_only: boolean;
}

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private get servicesCollection() {
    return this.firebaseService.getCollection('services');
  }

  private get zonesCollection() {
    return this.firebaseService.getCollection('zones');
  }

  async getServices(platform: string, pincode?: string) {
    if (!platform || !['web', 'app'].includes(platform.toLowerCase())) {
      throw new BadRequestException(
        'Invalid platform header. Must be web or app',
      );
    }

    const platformMode = platform.toLowerCase();
    const cacheKey = `services_${platformMode}_${pincode || 'all'}`;

    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    // Check pincode logic
    let scrapeServiceActive = true;
    let zoneActive = true;

    if (pincode) {
      const zoneSnapshot = await this.zonesCollection
        .where('pincode', '==', pincode)
        .where('is_active', '==', true)
        .limit(1)
        .get();

      if (zoneSnapshot.empty) {
        zoneActive = false;
        scrapeServiceActive = false;
      } else {
        const zone = zoneSnapshot.docs[0].data();
        scrapeServiceActive = zone.scrap_service_available;
      }
    }

    const servicesSnapshot = await this.servicesCollection.get();
    const services = servicesSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...(doc.data() as any) }) as ServiceData,
    );

    const result = services.map((service) => {
      let bookingEnabled = false;
      let message = '';

      const isScrap =
        service.category.toLowerCase().includes('scrap') ||
        service.category.toLowerCase().includes('recycling');

      if (isScrap) {
        if (!scrapeServiceActive && pincode) {
          bookingEnabled = false;
          message = 'Launching soon in your area';
        } else {
          bookingEnabled = true;
          message = 'Scrap pickup available in your area';
        }
      } else {
        // App-only services like cleaning, vehicle, laundry
        if (platformMode === 'web' || service.app_only) {
          if (platformMode === 'web') {
            bookingEnabled = false;
            message = 'Available via Blinklean App';
          } else {
            // Mobile app logic
            if (!zoneActive && pincode) {
              bookingEnabled = false;
              message = 'Launching soon in your area';
            } else {
              bookingEnabled = true;
            }
          }
        }
      }

      // Explicit fail safe overriding
      if (bookingEnabled === false) {
        this.logger.debug(
          `Booking disabled for ${service.name} on ${platformMode}`,
        );
      }

      return {
        id: service.id,
        name: service.name,
        category: service.category,
        description: service.description,
        booking_enabled: bookingEnabled,
        app_only: service.app_only,
        message: message || undefined,
      };
    });

    await this.cacheManager.set(cacheKey, result, 300);

    return result;
  }
}
