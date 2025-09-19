import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ 
    summary: '모든 사용자 조회',
    description: '시스템에 등록된 모든 사용자 목록을 조회합니다.'
  })
  @ApiResponse({ 
    status: 200, 
    description: '사용자 목록 반환 성공',
    type: [UserResponseDto]
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '페이지 번호 (기본값: 1)',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '페이지당 항목 수 (기본값: 10)',
    example: 10
  })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '사용자 상세 조회',
    description: 'ID로 특정 사용자의 상세 정보를 조회합니다.'
  })
  @ApiParam({
    name: 'id',
    description: '사용자 ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: '사용자 정보 반환 성공',
    type: UserResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: '사용자를 찾을 수 없음'
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ 
    summary: '사용자 생성',
    description: '새로운 사용자를 생성합니다.'
  })
  @ApiBody({
    description: '사용자 생성 데이터',
    type: CreateUserDto
  })
  @ApiResponse({ 
    status: 201, 
    description: '사용자 생성 완료',
    type: UserResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: '잘못된 요청 데이터'
  })
  @ApiResponse({ 
    status: 409, 
    description: '이미 존재하는 이메일'
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: '사용자 정보 수정',
    description: '기존 사용자의 정보를 수정합니다.'
  })
  @ApiParam({
    name: 'id',
    description: '수정할 사용자 ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({
    description: '수정할 사용자 데이터',
    type: UpdateUserDto
  })
  @ApiResponse({ 
    status: 200, 
    description: '사용자 정보 수정 완료',
    type: UserResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: '사용자를 찾을 수 없음'
  })
  update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: '사용자 삭제',
    description: '사용자를 시스템에서 삭제합니다.'
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 사용자 ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: '사용자 삭제 완료'
  })
  @ApiResponse({ 
    status: 404, 
    description: '사용자를 찾을 수 없음'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}