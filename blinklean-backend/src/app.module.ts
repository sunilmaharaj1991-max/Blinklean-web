import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisCacheModule } from './config/redis.config';
import { HealthController } from './health.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ZonesModule } from './zones/zones.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';

import { AvailabilityModule } from './availability/availability.module';
import { PaymentsModule } from './payments/payments.module';
import { ScrapModule } from './scrap/scrap.module';
import { PartnersModule } from './partners/partners.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    FirebaseModule,
    RedisCacheModule,
    AuthModule,
    UsersModule,
    ZonesModule,
    ServicesModule,
    BookingsModule,

    AvailabilityModule,
    PaymentsModule,
    ScrapModule,
    PartnersModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
