import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export enum ReservationStatus {
  ACTIVE = 'active',
  MATCHED = 'matched',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

@Entity('reservation_sales')
export class ReservationSale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sellerId: string;

  @Column({ nullable: true })
  productId: string;

  @Column()
  productName: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.ACTIVE,
  })
  status: ReservationStatus;

  // 예약 만료일
  @Column({ nullable: true })
  @Index()
  expiresAt: Date;

  // 자동 매칭 활성화 여부
  @Column({ default: true })
  autoMatchEnabled: boolean;

  // 매칭된 예약 구매 ID
  @Column({ nullable: true })
  matchedReservationPurchaseId: string;

  // 매칭된 시간
  @Column({ nullable: true })
  matchedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product;
}