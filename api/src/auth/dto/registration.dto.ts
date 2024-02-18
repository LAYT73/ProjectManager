import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
