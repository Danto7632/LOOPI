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
import { Order } from '../../orders/entities/order.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIAL_REFUNDED = 'partial_refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  VIRTUAL_ACCOUNT = 'virtual_account',
  MOBILE_PAYMENT = 'mobile_payment',
}

export enum EscrowStatus {
  HOLDING = 'holding', // 에스크로 보관 중
  RELEASED_TO_SELLER = 'released_to_seller', // 판매자에게 지급 완료
  REFUNDED_TO_BUYER = 'refunded_to_buyer', // 구매자에게 환불 완료
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  userId: string; // 결제한 사용자 (보통 구매자)

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: EscrowStatus,
    default: EscrowStatus.HOLDING,
  })
  escrowStatus: EscrowStatus;

  // 결제 금액
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  refundAmount: number;

  // 외부 결제 시스템 정보
  @Column({ nullable: true })
  externalPaymentId: string; // PG사 결제 ID

  @Column({ nullable: true })
  externalTransactionId: string;

  @Column({ nullable: true })
  pgProvider: string; // PG사명 (토스페이, 아임포트 등)

  // 결제 상세 정보
  @Column({ nullable: true })
  cardNumber: string; // 마스킹된 카드번호

  @Column({ nullable: true })
  cardCompany: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  accountNumber: string;

  // 결제 일시
  @Column({ nullable: true })
  paidAt: Date;

  @Column({ nullable: true })
  cancelledAt: Date;

  @Column({ nullable: true })
  refundedAt: Date;

  // 실패 정보
  @Column({ nullable: true })
  failureReason: string;

  @Column({ nullable: true })
  failureCode: string;

  // 에스크로 관련
  @Column({ nullable: true })
  escrowReleasedAt: Date; // 에스크로 해제 시점

  @Column({ nullable: true })
  escrowRefundedAt: Date; // 에스크로 환불 시점

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}