import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum, IsPhoneNumber, MinLength } from 'class-validator';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
    uniqueItems: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동'
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: '전화번호',
    example: '010-1234-5678'
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.jpg'
  })
  @IsOptional()
  @IsString()
  profileImage?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: '사용자 권한',
    enum: UserRole,
    example: UserRole.USER
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: '사용자 상태',
    enum: UserStatus,
    example: UserStatus.ACTIVE
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    description: '판매자 인증 여부',
    example: false
  })
  @IsOptional()
  isSellerVerified?: boolean;

  @ApiPropertyOptional({
    description: '구매자 인증 여부',
    example: false
  })
  @IsOptional()
  isBuyerVerified?: boolean;
}

export class UserResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동'
  })
  name: string;

  @ApiPropertyOptional({
    description: '전화번호',
    example: '010-1234-5678'
  })
  phone?: string;

  @ApiPropertyOptional({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.jpg'
  })
  profileImage?: string;

  @ApiProperty({
    description: '사용자 권한',
    enum: UserRole,
    example: UserRole.USER
  })
  role: UserRole;

  @ApiProperty({
    description: '사용자 상태',
    enum: UserStatus,
    example: UserStatus.ACTIVE
  })
  status: UserStatus;

  @ApiProperty({
    description: '신뢰도 점수',
    example: 85.5,
    minimum: 0,
    maximum: 100
  })
  trustScore: number;

  @ApiProperty({
    description: '총 거래 횟수',
    example: 25
  })
  totalTransactions: number;

  @ApiProperty({
    description: '성공적인 거래 횟수',
    example: 24
  })
  successfulTransactions: number;

  @ApiProperty({
    description: '판매자 인증 여부',
    example: false
  })
  isSellerVerified: boolean;

  @ApiProperty({
    description: '구매자 인증 여부',
    example: true
  })
  isBuyerVerified: boolean;

  @ApiPropertyOptional({
    description: '마지막 로그인 시간',
    example: '2024-03-15T10:30:00Z'
  })
  lastLoginAt?: Date;

  @ApiProperty({
    description: '계정 생성일',
    example: '2024-01-15T09:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: '마지막 수정일',
    example: '2024-03-15T10:30:00Z'
  })
  updatedAt: Date;
}