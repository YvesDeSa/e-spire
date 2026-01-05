import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateToken(user);
  }


  async loginWithGoogle(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      
      if (!payload) throw new UnauthorizedException('Token Google inválido');

      const { email, name, sub: googleId, picture } = payload;

      if (!email || !name || !googleId) {
        throw new UnauthorizedException('Google não forneceu email, nome ou ID.');
      }

      let user = await this.usersService.findByEmail(email);

      if (!user) {
        user = await this.usersService.createFromSocial({
          email,
          name,
          googleId,
          avatarUrl: picture,
        });
      } else if (!user.googleId) {
        await this.usersService.updateGoogleId(user.id, googleId);
      }

      return this.generateToken(user);
    } catch (error) {
     
      throw new UnauthorizedException('Falha na autenticação Google');
    }
  }

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return this.generateToken(newUser);
  }

  async loginWithFacebook(token: string) {
    try {
      const result = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
      );

      const data = await result.json();

      if (!result.ok || data.error) {
        throw new UnauthorizedException('Token do Facebook inválido');
      }

      const email = data.email;
      const name = data.name;
      const facebookId = data.id;
      const avatarUrl = data.picture?.data?.url;

      if (!email) {
        throw new UnauthorizedException('O Facebook não forneceu o email (obrigatório).');
      }
      
      let user = await this.usersService.findByEmail(email);

      if (!user) {
        user = await this.usersService.createFromSocial({
          email,
          name,
          facebookId, 
          avatarUrl,
        });
      } else if (!user.facebookId) {
        await this.usersService.updateFacebookId(user.id, facebookId);
      }

      return this.generateToken(user);

    } catch (error) {
      console.error(error); 
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Erro ao conectar com Facebook');
    }
  }
}