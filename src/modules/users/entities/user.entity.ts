import { Exclude } from 'class-transformer';

export class User {
  id: string;
  email: string;
  name: string;
  
  @Exclude()
  passwordHash?: string | null; 
  
  @Exclude()
  googleId?: string | null;

  avatarUrl?: string | null;
  
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}