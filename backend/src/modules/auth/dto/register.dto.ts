import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '이메일 주소',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '비밀번호 (최소 6자)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '전화번호',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;
}