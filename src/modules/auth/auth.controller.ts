import { Body, Controller, Post, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { LoginDto } from './dto/login.dto'; 
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FacebookLoginDto } from './dto/facebook-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor) 
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('google')
  async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return this.authService.loginWithGoogle(googleLoginDto.token);
  }

  @Post('facebook')
   async facebookLogin(@Body() dto: FacebookLoginDto) {
   return this.authService.loginWithFacebook(dto.token);
  }
}