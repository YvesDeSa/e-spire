import { Injectable, ConflictException } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserSocialDto } from './dto/create-user-social.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) { }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findByEmail(createUserDto.email);
    if (userExists) throw new ConflictException('Email already in use');

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    return this.usersRepository.create({ ...createUserDto, password: passwordHash });
  }


  async createFromSocial(data: CreateUserSocialDto) {
    return this.usersRepository.create(data);
  }

  async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async updateGoogleId(userId: string, googleId: string) {
    return this.usersRepository.updateGoogleId(userId, googleId);
  }

}