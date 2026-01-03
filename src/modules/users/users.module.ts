// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { UsersPrismaRepository } from './repositories/users-prisma.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: IUsersRepository, 
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersService, IUsersRepository],
})
export class UsersModule {}