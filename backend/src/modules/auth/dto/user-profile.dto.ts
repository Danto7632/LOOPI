import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../users/entities/user.entity';

export class UserProfileDto {
  @ApiProperty({
    example: 'uuid-string',
    description: '사용자 ID',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '이메일 주소',
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
  })
  name: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '전화번호',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '프로필 이미지 URL',
    required: false,
  })
  profileImage?: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: '사용자 역할',
  })
  role: UserRole;

  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    description: '사용자 상태',
  })
  status: UserStatus;

  @ApiProperty({
    example: 85.5,
    description: '신뢰도 점수 (0-100)',
  })
  trustScore: number;

  @ApiProperty({
    example: 25,
    description: '총 거래 횟수',
  })
  totalTransactions: number;

  @ApiProperty({
    example: 23,
    description: '성공적인 거래 횟수',
  })
  successfulTransactions: number;

  @ApiProperty({
    example: true,
    description: '판매자 인증 여부',
  })
  isSellerVerified: boolean;

  @ApiProperty({
    example: true,
    description: '구매자 인증 여부',
  })
  isBuyerVerified: boolean;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: '계정 생성일',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-20T15:45:00Z',
    description: '마지막 로그인 시간',
    required: false,
  })
  lastLoginAt?: Date;
}