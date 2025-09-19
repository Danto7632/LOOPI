import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationSale } from './entities/reservation-sale.entity';
import { ReservationPurchase } from './entities/reservation-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationSale, ReservationPurchase])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ReservationsModule {}