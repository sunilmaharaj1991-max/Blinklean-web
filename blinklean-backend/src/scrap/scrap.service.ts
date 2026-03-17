import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosError } from 'axios';
import { ScrapRate } from './scrap-rate.entity';
import { ScrapBooking, ScrapBookingStatus } from './scrap-booking.entity';
import { CalculateScrapDto } from './dto/calculate-scrap.dto';
import { CreateScrapBookingDto } from './dto/create-scrap-booking.dto';

@Injectable()
export class ScrapService {
  constructor(
    @InjectRepository(ScrapRate)
    private readonly scrapRateRepository: Repository<ScrapRate>,
    @InjectRepository(ScrapBooking)
    private readonly scrapBookingRepository: Repository<ScrapBooking>,
  ) {}

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
    const count = await this.scrapRateRepository.count();
    if (count === 0) {
      await this.scrapRateRepository.save([
        { material_name: 'newspapers', rate_per_kg: 15.0 },
        { material_name: 'cardboard', rate_per_kg: 10.0 },
        { material_name: 'plastic', rate_per_kg: 12.0 },
        { material_name: 'metal', rate_per_kg: 30.0 },
        { material_name: 'aluminum', rate_per_kg: 110.0 },
        { material_name: 'copper', rate_per_kg: 400.0 },
        { material_name: 'e-waste', rate_per_kg: 25.0 },
        { material_name: 'glass bottles', rate_per_kg: 2.0 },
        { material_name: 'mixed scrap', rate_per_kg: 8.0 },
      ]);
    }
  }

  /** Get all active material rates */
  async getAllRates(): Promise<ScrapRate[]> {
    return this.scrapRateRepository.find({ where: { is_active: true } });
  }

  /** Update a material rate by ID */
  async updateRate(id: number, rate_per_kg: number): Promise<ScrapRate | null> {
    await this.scrapRateRepository.update(id, { rate_per_kg });
    return this.scrapRateRepository.findOne({ where: { id } });
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
      const rate = await this.scrapRateRepository.findOne({
        where: {
          material_name: item.material_name.toLowerCase(),
          is_active: true,
        },
      });

      if (!rate) {
        throw new NotFoundException(
          `Material rate for "${item.material_name}" not found`,
        );
      }

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
  async createBooking(dto: CreateScrapBookingDto): Promise<ScrapBooking> {
    const booking = this.scrapBookingRepository.create({
      ...dto,
      status: dto.status ?? ScrapBookingStatus.PENDING_APPROVAL,
    });
    return this.scrapBookingRepository.save(booking);
  }

  /** Get a single booking by its numeric ID */
  async getBookingById(id: number): Promise<ScrapBooking | null> {
    return this.scrapBookingRepository.findOne({ where: { id } });
  }

  /** Get all bookings (admin) ordered by newest first */
  async getAllBookings(): Promise<ScrapBooking[]> {
    return this.scrapBookingRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  /** Get all bookings for a specific user (by Firebase UID) */
  async getBookingsByUser(userId: string): Promise<ScrapBooking[]> {
    return this.scrapBookingRepository.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });
  }

  /** Confirm a pending booking and simulate SMS notification */
  async confirmBooking(
    id: number,
    pickupTiming: string,
  ): Promise<ScrapBooking & { smsStatus: string }> {
    const booking = await this.scrapBookingRepository.findOne({
      where: { id },
    });
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = ScrapBookingStatus.CONFIRMED;
    booking.pickup_timing = pickupTiming;

    const saved = await this.scrapBookingRepository.save(booking);

    const smsMessage =
      `Dear ${saved.user_name}, your Blinklean scrap pickup is CONFIRMED! ` +
      `Our agent will arrive between ${pickupTiming}. ` +
      `Thank you for choosing green! 🌱 - Team Blinklean`;

    await this.sendRealSMS(saved.phone_number, smsMessage);

    return { ...saved, smsStatus: `SMS sent to ${saved.phone_number}` };
  }

  /** Update the status of a booking (generic admin action) */
  async updateBookingStatus(
    id: number,
    status: string,
    final_value?: number,
  ): Promise<ScrapBooking> {
    const booking = await this.scrapBookingRepository.findOne({
      where: { id },
    });
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = status;
    if (final_value !== undefined) {
      booking.final_value = final_value;
    }

    return this.scrapBookingRepository.save(booking);
  }
}
