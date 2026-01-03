
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service'; 
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersPrismaRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? new User(raw) : null;
  }

  async create(data: CreateUserDto): Promise<User> {
    const raw = await this.prisma.user.create({ data });
    return new User(raw); 
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    return raw ? new User(raw) : null;
  }

}