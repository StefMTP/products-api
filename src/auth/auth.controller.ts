import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LogInDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.register(authCredentialsDto);
    }

    @Post('/login')
    async login(@Body() logInDto: LogInDto): Promise<{accessToken: string}> {
        return await this.authService.login(logInDto);
    }

    @ApiBearerAuth()
    @Post('/protected')
    @UseGuards(AuthGuard())
    protected(@Req() req) {
        console.log(req);
    }
}
