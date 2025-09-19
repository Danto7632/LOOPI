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

export enum ReviewType {
  BUYER_TO_SELLER = 'buyer_to_seller',
  SELLER_TO_BUYER = 'seller_to_buyer',
}

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  reviewerId: string; // 리뷰 작성자

  @Column()
  revieweeId: string; // 리뷰 대상자

  @Column({
    type: 'enum',
    enum: ReviewType,
  })
  type: ReviewType;

  @Column({ type: 'int', width: 1 })
  rating: number; // 1-5 별점

  @Column({ type: 'text', nullable: true })
  content: string;

  // 세부 평가 항목들
  @Column({ type: 'int', width: 1, nullable: true })
  communicationRating: number; // 소통 평점

  @Column({ type: 'int', width: 1, nullable: true })
  deliveryRating: number; // 배송 평점

  @Column({ type: 'int', width: 1, nullable: true })
  conditionRating: number; // 상품 상태 평점

  // 추천 태그들 (JSON 배열)
  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ default: false })
  isRecommended: boolean; // 추천 여부

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewerId' })
  reviewer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'revieweeId' })
  reviewee: User;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}