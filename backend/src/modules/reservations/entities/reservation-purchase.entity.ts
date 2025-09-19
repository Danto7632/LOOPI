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

export enum ReservationPurchaseStatus {
  ACTIVE = 'active',
  MATCHED = 'matched',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum PriceAlertType {
  EXACT = 'exact', // 정확한 가격 일치시만 알림
  LOWER = 'lower', // 희망가격 이하일 때 알림
  HIGHER = 'higher', // 희망가격 이상일 때 알림
}

@Entity('reservation_purchases')
export class ReservationPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  buyerId: string;

  @Column()
  productName: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  desiredPrice: number; // 희망 구매가

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxPrice: number; // 최대 구매가 (선택)

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  notes: string; // 구매 조건 등 메모

  @Column({
    type: 'enum',
    enum: ReservationPurchaseStatus,
    default: ReservationPurchaseStatus.ACTIVE,
  })
  status: ReservationPurchaseStatus;

  @Column({
    type: 'enum',
    enum: PriceAlertType,
    default: PriceAlertType.LOWER,
  })
  priceAlertType: PriceAlertType;

  // 알림 설정
  @Column({ default: true })
  emailAlert: boolean;

  @Column({ default: true })
  smsAlert: boolean;

  @Column({ default: true })
  pushAlert: boolean;

  // 예약 만료일
  @Column({ nullable: true })
  @Index()
  expiresAt: Date;

  // 자동 매칭 활성화 여부
  @Column({ default: true })
  autoMatchEnabled: boolean;

  // 매칭된 예약 판매 ID
  @Column({ nullable: true })
  matchedReservationSaleId: string;

  // 매칭된 시간
  @Column({ nullable: true })
  matchedAt: Date;

  // 우선순위 (1이 가장 높음)
  @Column({ default: 1 })
  @Index()
  priority: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;
}