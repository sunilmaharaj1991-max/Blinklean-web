import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { CalculateScrapDto } from './dto/calculate-scrap.dto';
import { CreateScrapBookingDto } from './dto/create-scrap-booking.dto';

@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  /** GET /scrap/rates — Get all active material rates */
  @Get('rates')
  getRates() {
    return this.scrapService.getAllRates();
  }

  /** POST /scrap/estimate — Calculate estimated pickup value */
  @Post('estimate')
  calculateEstimate(@Body() dto: CalculateScrapDto) {
    return this.scrapService.calculateEstimatedValue(dto);
  }

  /** POST /scrap/booking — Submit a new scrap pickup booking */
  @Post('booking')
  createBooking(@Body() dto: CreateScrapBookingDto) {
    return this.scrapService.createBooking(dto);
  }

  /** GET /scrap/user-bookings/:userId — Get bookings for a logged-in user */
  @Get('user-bookings/:userId')
  getUserBookings(@Param('userId') userId: string) {
    return this.scrapService.getBookingsByUser(userId);
  }

  /** GET /scrap/all-bookings — Admin: fetch all bookings from PostgreSQL */
  @Get('all-bookings')
  getAllBookings() {
    return this.scrapService.getAllBookings();
  }

  /** PATCH /scrap/booking/:id/confirm — Admin: confirm booking and notify customer */
  @Patch('booking/:id/confirm')
  confirmBooking(
    @Param('id') id: string,
    @Body() body: { pickupTiming?: string },
  ) {
    return this.scrapService.confirmBooking(
      id,
      body.pickupTiming ?? '10:00 AM – 1:00 PM Tomorrow',
    );
  }

  /** PATCH /scrap/booking/:id/status — Admin: update booking status */
  @Patch('booking/:id/status')
  updateBookingStatus(
    @Param('id') id: string,
    @Body() body: { status: string; final_value?: number },
  ) {
    return this.scrapService.updateBookingStatus(
      id,
      body.status,
      body.final_value,
    );
  }
}
