import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ScrapBookingStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CONFIRMED = 'CONFIRMED',
  PICKUP_SCHEDULED = 'PICKUP_SCHEDULED',
  COLLECTED = 'COLLECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('scrap_bookings')
export class ScrapBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  user_name: string;

  @Column()
  phone_number: string;

  @Column('text')
  address: string;

  @Column()
  pincode: string;

  @Column({ nullable: true })
  pickup_point: string;

  @Column('simple-json')
  items: Array<{ material_name: string; estimated_weight: number }>;

  @Column({
    type: 'varchar',
    default: ScrapBookingStatus.PENDING_APPROVAL,
  })
  status: string;

  @Column({ nullable: true })
  pickup_timing: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  final_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
