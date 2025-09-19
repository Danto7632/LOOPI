import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export enum OrderStatus {
  PENDING = 'pending', // 주문 생성됨
  PAYMENT_PENDING = 'payment_pending', // 결제 대기
  PAYMENT_COMPLETED = 'payment_completed', // 결제 완료
  PREPARING = 'preparing', // 배송 준비
  SHIPPED = 'shipped', // 배송 중
  DELIVERED = 'delivered', // 배송 완료
  COMPLETED = 'completed', // 거래 완료
  CANCELLED = 'cancelled', // 취소됨
  REFUNDED = 'refunded', // 환불됨
  DISPUTED = 'disputed', // 분쟁 상태
}

export enum OrderType {
  IMMEDIATE = 'immediate', // 즉시 구매
  RESERVATION = 'reservation', // 예약 매칭
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  buyerId: string;

  @Column()
  sellerId: string;

  @Column()
  productId: string;

  @Column({
    type: 'enum',
    enum: OrderType,
    default: OrderType.IMMEDIATE,
  })
  type: OrderType;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ default: 1 })
  quantity: number;

  // 가격 정보
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productPrice: number; // 상품 가격

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  shippingFee: number; // 배송비

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  platformFee: number; // 플랫폼 수수료

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number; // 총 결제 금액

  // 배송 정보
  @Column({ nullable: true })
  shippingAddress: string;

  @Column({ nullable: true })
  shippingPhone: string;

  @Column({ nullable: true })
  shippingName: string;

  @Column({ nullable: true })
  shippingMemo: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({ nullable: true })
  shippingCompany: string;

  // 예약 매칭 관련
  @Column({ nullable: true })
  reservationSaleId: string;

  @Column({ nullable: true })
  reservationPurchaseId: string;

  // 결제 정보
  @Column({ nullable: true })
  paymentId: string; // 외부 결제 시스템 ID

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  paidAt: Date;

  // 배송 일정
  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  cancelledAt: Date;

  @Column({ nullable: true })
  cancellationReason: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;
}