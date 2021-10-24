import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LogInDto } from './dto/log-in.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository, private jwtService: JwtService) {}

    async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.usersRepository.createUser(authCredentialsDto);
    }

    async login(logInDto: LogInDto): Promise<{accessToken: string}> {
        const { email, password } = logInDto;

        const user = await this.usersRepository.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {uid: user.id, username: user.username, email: user.email};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new UnauthorizedException('Wrong email or password.');
        }
    }
}
