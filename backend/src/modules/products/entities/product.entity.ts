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

export enum ProductStatus {
  ACTIVE = 'active',
  SOLD = 'sold',
  RESERVED = 'reserved',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export enum ProductCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
}

export enum StorageType {
  SELLER = 'seller', // 판매자 보관
  PLATFORM = 'platform', // 플랫폼 위탁 보관
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sellerId: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ProductCondition,
    default: ProductCondition.GOOD,
  })
  condition: ProductCondition;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @Column({
    type: 'enum',
    enum: StorageType,
    default: StorageType.SELLER,
  })
  storageType: StorageType;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  likeCount: number;

  // 이미지 URL들 (JSON 배열로 저장)
  @Column({ type: 'json', nullable: true })
  images: string[];

  // 진품 인증 여부
  @Column({ default: false })
  isAuthenticated: boolean;

  // 인증 기관/방법
  @Column({ nullable: true })
  authenticationMethod: string;

  // 예약 판매 여부
  @Column({ default: false })
  isReservationSale: boolean;

  // 즉시 구매 가능 여부
  @Column({ default: true })
  isImmediatePurchase: boolean;

  @Column({ nullable: true })
  @Index()
  tags: string; // 검색용 태그들 (콤마로 구분)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;
}