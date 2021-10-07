import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.register(authCredentialsDto);
    }
}
