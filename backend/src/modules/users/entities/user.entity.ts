import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  // 신뢰도 점수 (0-100)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  trustScore: number;

  // 총 거래 횟수
  @Column({ default: 0 })
  totalTransactions: number;

  // 성공적인 거래 횟수
  @Column({ default: 0 })
  successfulTransactions: number;

  // 판매자 인증 여부
  @Column({ default: false })
  isSellerVerified: boolean;

  // 구매자 인증 여부
  @Column({ default: false })
  isBuyerVerified: boolean;

  // 마지막 로그인 시간
  @Column({ nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}