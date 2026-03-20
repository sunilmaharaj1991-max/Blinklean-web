import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

interface BookingData {
  userId: string;
  status: string;
}

interface UserData {
  phone_number: string;
}

interface PaymentRecord {
  booking_id: string;
  payment_status: string;
}

interface RazorpayOrder {
  id: string;
  amount: number;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private razorpay: any;

  constructor(private readonly firebaseService: FirebaseService) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
    });
  }

  private get paymentsCollection() {
    return this.firebaseService.getCollection('payments');
  }

  private get bookingsCollection() {
    return this.firebaseService.getCollection('bookings');
  }

  private get usersCollection() {
    return this.firebaseService.getCollection('users');
  }

  async createOrder(phone: string, dto: CreateOrderDto) {
    const bookingDoc = await this.bookingsCollection
      .doc(String(dto.booking_id))
      .get();

    if (!bookingDoc.exists) {
      throw new BadRequestException('Booking not found');
    }

    const bookingData = bookingDoc.data() as BookingData;
    const booking = { id: bookingDoc.id, ...bookingData };

    const userDoc = await this.usersCollection
      .doc(String(booking.userId))
      .get();
    if (!userDoc.exists) {
      throw new BadRequestException('User not found for this booking');
    }

    const user = userDoc.data() as UserData;

    if (user.phone_number !== phone) {
      throw new BadRequestException('Payment unauthorized for this booking');
    }

    if (booking.status === 'PAID') {
      throw new BadRequestException(
        'Payment already completed for this booking',
      );
    }

    // Usually derived from pricing logic, fixed 199 for scrap test
    const amount = 199;

    const options = {
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: `receipt_${booking.id}_${Date.now()}`,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const order = (await this.razorpay.orders.create(
        options,
      )) as RazorpayOrder;

      // Record pending payment
      const paymentData = {
        booking_id: booking.id,
        amount: amount,
        payment_status: 'pending',
        payment_gateway: 'razorpay',
        transaction_reference: order.id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await this.paymentsCollection.add(paymentData);

      return {
        order_id: order.id,
        amount: order.amount,
        payment_key: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error('Razorpay order creation failed', errorMessage);
      throw new BadRequestException('Failed to create payment order');
    }
  }

  async verifyPayment(dto: VerifyPaymentDto) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = dto;

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret';

    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      throw new BadRequestException('Payment signature verification failed');
    }

    // Success flow - find payment by transaction_reference
    const paymentSnapshot = await this.paymentsCollection
      .where('transaction_reference', '==', razorpay_order_id)
      .limit(1)
      .get();

    if (paymentSnapshot.empty) {
      throw new BadRequestException('Payment order not found in system');
    }

    const paymentDoc = paymentSnapshot.docs[0];
    const paymentData = paymentDoc.data() as PaymentRecord;
    const payment = {
      id: paymentDoc.id,
      ...paymentData,
    };

    if (payment.payment_status === 'success') {
      throw new BadRequestException('Payment already verified');
    }

    // Update payment status
    await paymentDoc.ref.update({
      payment_status: 'success',
      updated_at: new Date(),
    });

    // Update booking status
    const bookingDoc = await this.bookingsCollection
      .doc(payment.booking_id)
      .get();
    if (bookingDoc.exists) {
      await bookingDoc.ref.update({
        status: 'PAID',
        updated_at: new Date(),
      });
    }

    return { status: 'success', message: 'Payment verified successfully' };
  }
}
