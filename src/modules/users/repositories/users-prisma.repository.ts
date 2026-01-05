import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserSocialDto } from '../dto/create-user-social.dto';

@Injectable()
export class UsersPrismaRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDto | CreateUserSocialDto): Promise<User> {
    const passwordHash = 'password' in data ? (data as CreateUserDto).password : undefined;
    const googleId = 'googleId' in data ? (data as CreateUserSocialDto).googleId : undefined;
    const facebookId = 'facebookId' in data ? (data as CreateUserSocialDto).facebookId : undefined;
    const avatarUrl = 'avatarUrl' in data ? (data as CreateUserSocialDto).avatarUrl : undefined;

    const raw = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        googleId,
        facebookId,
        avatarUrl,
      },
    });

    return new User(raw);
  }

  async updateGoogleId(userId: string, googleId: string): Promise<User> {
    const raw = await this.prisma.user.update({
      where: { id: userId },
      data: { googleId }
    });
    return new User(raw);
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    return raw ? new User(raw) : null;
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? new User(raw) : null;
  }

  async updateFacebookId(userId: string, facebookId: string): Promise<User> {
    const raw = await this.prisma.user.update({
      where: { id: userId },
      data: { facebookId },
    });
    return new User(raw);
  }
}