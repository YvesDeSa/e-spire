import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

    return {
      accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };
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

      return {
        accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      };
    } catch (error) {
     
      throw new UnauthorizedException('Falha na autenticação Google');
    }
  }
}