import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../users/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT 액세스 토큰',
  })
  accessToken: string;

  @ApiProperty({
    example: 'Bearer',
    description: '토큰 타입',
  })
  tokenType: string;

  @ApiProperty({
    example: 3600,
    description: '토큰 만료 시간 (초)',
  })
  expiresIn: number;

  @ApiProperty({
    description: '사용자 정보',
  })
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: UserStatus;
    profileImage?: string;
  };
}