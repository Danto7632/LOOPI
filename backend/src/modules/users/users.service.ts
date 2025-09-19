import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profileImage: true,
        role: true,
        status: true,
        trustScore: true,
        totalTransactions: true,
        successfulTransactions: true,
        isSellerVerified: true,
        isBuyerVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profileImage: true,
        role: true,
        status: true,
        trustScore: true,
        totalTransactions: true,
        successfulTransactions: true,
        isSellerVerified: true,
        isBuyerVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 이메일 중복 체크
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // 비밀번호 제외하고 반환
    const { password, ...result } = savedUser;
    return result as User;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // 비밀번호가 포함된 경우 해싱
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async updateTrustScore(id: string, score: number): Promise<User> {
    await this.userRepository.update(id, { trustScore: score });
    return this.findOne(id);
  }

  async incrementTransactionCount(id: string, successful: boolean = true): Promise<User> {
    const user = await this.findOne(id);
    const updateData: Partial<User> = {
      totalTransactions: user.totalTransactions + 1,
    };

    if (successful) {
      updateData.successfulTransactions = user.successfulTransactions + 1;
    }

    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }
}