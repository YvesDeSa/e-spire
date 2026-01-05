export class CreateUserSocialDto {
  email: string;
  name: string;
  googleId?: string;
  facebookId?: string;
  avatarUrl?: string;
}