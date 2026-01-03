import { CreateUserSocialDto } from '../dto/create-user-social.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class IUsersRepository {
  abstract create(data: CreateUserDto | CreateUserSocialDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract updateGoogleId(userId: string, googleId: string): Promise<User>;
}