import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { FirebaseService } from '../firebase/firebase.service';
import { CalculateScrapDto } from './dto/calculate-scrap.dto';
import { CreateScrapBookingDto } from './dto/create-scrap-booking.dto';

@Injectable()
export class ScrapService implements OnModuleInit {
  constructor(private readonly firebaseService: FirebaseService) {}

  private get scrapRateCollection() {
    return this.firebaseService.getCollection('scrap_rates');
  }

  private get scrapBookingCollection() {
    return this.firebaseService.getCollection('scrap_bookings');
  }

  /** Internal helper to send real SMS via Fast2SMS gateway */
  private async sendRealSMS(
    phoneNumber: string,
    message: string,
  ): Promise<void> {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey || apiKey === 'YOUR_FAST2SMS_KEY_HERE') {
      console.warn(
        '📱 FAST2SMS_API_KEY not configured. Falling back to log-only mode.',
      );
      console.log(`[SIMULATED SMS to ${phoneNumber}]: ${message}`);
      return;
    }

    try {
      // Fast2SMS expects 10 digit numbers for the 'q' (Quick) route
      const cleanNumber = phoneNumber.replace(/[^0-9]/g, '').slice(-10);

      const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
        params: {
          authorization: apiKey,
          message: message,
          language: 'english',
          route: 'q',
          numbers: cleanNumber,
        },
      });
      console.log('✅ Fast2SMS Delivery Response:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.message;
      const responseData = axiosError.response?.data;

      console.error(
        '❌ Fast2SMS Delivery Failed:',
        responseData || errorMessage,
      );
    }
  }

  /** Seed default rates on first run if table is empty */
  async onModuleInit(): Promise<void> {
    const snapshot = await this.scrapRateCollection.limit(1).get();
    if (snapshot.empty) {
      const defaultRates = [
        { material_name: 'newspapers', rate_per_kg: 15.0, is_active: true },
        { material_name: 'cardboard', rate_per_kg: 10.0, is_active: true },
        { material_name: 'plastic', rate_per_kg: 12.0, is_active: true },
        { material_name: 'metal', rate_per_kg: 30.0, is_active: true },
        { material_name: 'aluminum', rate_per_kg: 110.0, is_active: true },
        { material_name: 'copper', rate_per_kg: 400.0, is_active: true },
        { material_name: 'e-waste', rate_per_kg: 25.0, is_active: true },
        { material_name: 'glass bottles', rate_per_kg: 2.0, is_active: true },
        { material_name: 'mixed scrap', rate_per_kg: 8.0, is_active: true },
      ];

      const batch = this.firebaseService.firestore.batch();
      for (const rate of defaultRates) {
        const docRef = this.scrapRateCollection.doc();
        batch.set(docRef, rate);
      }
      await batch.commit();
      console.log('✅ Seeded default scrap rates to Firestore');
    }
  }

  /** Get all active material rates */
  async getAllRates(): Promise<any[]> {
    const snapshot = await this.scrapRateCollection
      .where('is_active', '==', true)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  /** Update a material rate by ID */
  async updateRate(id: string, rate_per_kg: number): Promise<any | null> {
    await this.scrapRateCollection.doc(id).update({ rate_per_kg });
    const updated = await this.scrapRateCollection.doc(id).get();
    return { id: updated.id, ...updated.data() };
  }

  /** Calculate estimated pickup value based on current rates */
  async calculateEstimatedValue(dto: CalculateScrapDto): Promise<{
    total_estimated_value: number;
    currency: string;
    items: Array<{
      material: string;
      estimated_weight: number;
      rate_per_kg: number;
      item_estimated_value: number;
    }>;
    message: string;
  }> {
    let totalEstimatedValue = 0;
    const itemsDetails: Array<{
      material: string;
      estimated_weight: number;
      rate_per_kg: number;
      item_estimated_value: number;
    }> = [];

    for (const item of dto.items) {
      const snapshot = await this.scrapRateCollection
        .where('material_name', '==', item.material_name.toLowerCase())
        .where('is_active', '==', true)
        .limit(1)
        .get();

      if (snapshot.empty) {
        throw new NotFoundException(
          `Material rate for "${item.material_name}" not found`,
        );
      }

      const rate = snapshot.docs[0].data() as any;

      const itemEstimatedValue = rate.rate_per_kg * item.estimated_weight;
      totalEstimatedValue += itemEstimatedValue;

      itemsDetails.push({
        material: item.material_name,
        estimated_weight: item.estimated_weight,
        rate_per_kg: rate.rate_per_kg,
        item_estimated_value: parseFloat(itemEstimatedValue.toFixed(2)),
      });
    }

    return {
      total_estimated_value: parseFloat(totalEstimatedValue.toFixed(2)),
      currency: 'INR',
      items: itemsDetails,
      message:
        'Estimated value is based on current market rates. Final value will be confirmed at pickup.',
    };
  }

  /** Create a new scrap pickup booking */
  async createBooking(dto: CreateScrapBookingDto): Promise<any> {
    const bookingData = {
      ...dto,
      status: dto.status ?? 'PENDING_APPROVAL',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const docRef = await this.scrapBookingCollection.add(bookingData);
    return { id: docRef.id, ...bookingData };
  }

  /** Get a single booking by its numeric ID */
  async getBookingById(id: string): Promise<any | null> {
    const doc = await this.scrapBookingCollection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  /** Get all bookings (admin) ordered by newest first */
  async getAllBookings(): Promise<any[]> {
    const snapshot = await this.scrapBookingCollection
      .orderBy('created_at', 'desc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  /** Get all bookings for a specific user (by Firebase UID) */
  async getBookingsByUser(userId: string): Promise<any[]> {
    const snapshot = await this.scrapBookingCollection
      .where('userId', '==', userId)
      .orderBy('created_at', 'desc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  /** Confirm a pending booking and simulate SMS notification */
  async confirmBooking(id: string, pickupTiming: string): Promise<any> {
    const docRef = this.scrapBookingCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) throw new NotFoundException('Booking not found');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = doc.data() as any;
    const updateData = {
      status: 'CONFIRMED',
      pickup_timing: pickupTiming,
      updated_at: new Date(),
    };

    await docRef.update(updateData);

    const smsMessage =
      `Dear ${data.user_name || 'Customer'}, your Blinklean scrap pickup is CONFIRMED! ` +
      `Our agent will arrive between ${pickupTiming}. ` +
      `Thank you for choosing green! 🌱 - Team Blinklean`;

    await this.sendRealSMS(data.phone_number, smsMessage);

    return {
      id: doc.id,
      ...data,
      ...updateData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      smsStatus: `SMS sent to ${data.phone_number}`,
    };
  }

  /** Update the status of a booking (generic admin action) */
  async updateBookingStatus(
    id: string,
    status: string,
    final_value?: number,
  ): Promise<any> {
    const docRef = this.scrapBookingCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) throw new NotFoundException('Booking not found');

    const updateData: any = {
      status,
      updated_at: new Date(),
    };
    if (final_value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateData.final_value = final_value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }
}
