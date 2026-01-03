import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'The email provided is invalid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;
}