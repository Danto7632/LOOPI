import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('business_verifications')
export class BusinessVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  businessName: string;

  @Column()
  businessNumber: string; // 사업자등록번호

  @Column()
  representativeName: string; // 대표자명

  @Column({ nullable: true })
  businessAddress: string;

  @Column({ nullable: true })
  businessPhone: string;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  status: VerificationStatus;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ nullable: true })
  businessLicenseImageUrl: string; // 사업자등록증 이미지

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({ nullable: true })
  verifiedBy: string; // 검증한 관리자 ID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}