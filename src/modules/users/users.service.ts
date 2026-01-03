import { Injectable, ConflictException } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: IUsersRepository) { }

    async create(createUserDto: CreateUserDto) {
        const userExists = await this.usersRepository.findByEmail(createUserDto.email);

        if (userExists) {
            throw new ConflictException('Email already in use');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(createUserDto.password, salt);

        return this.usersRepository.create({
            ...createUserDto,
            password: passwordHash,
        });
    }

    async findById(id: string) {
        return this.usersRepository.findById(id);
    }

}