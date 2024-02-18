import { Body, Controller, Post, Delete, UseGuards, Get, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import RefreshTokenDto from './dto/refresh-token.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
    ) {};

    @Post('registration')
    async registration(@Body() body: RegistrationDto) {
      const { email, phone, username, password } = body;
      return await this.authService.registration(email, phone, username, password);
    };

    @Post()
    async login(@Body() body: LoginDto) {
      const { email, password } = body;
      return await this.authService.login(email, password);
    };

    @Post('google')
    async googleLogin(@Body() body: GoogleLoginDto) {
      const { accessToken, username } = body;
      return await this.authService.googleLogin(accessToken, username);
    };

    @Post('refresh')
    async refreshToken(@Body() body: RefreshTokenDto) {
      const result = await this.authService.refresh(body.refresh_token);
      return result;
    };

    @Delete('logout')
    async logout(@Body() body: RefreshTokenDto) {
      return this.authService.logout(body.refresh_token);
    };

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfile(@Req() req) {
        const email = req.user.email;
        return this.userService.findByEmail(email);
    };
  
}
