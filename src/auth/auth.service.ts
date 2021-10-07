import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {}

    async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.usersRepository.createUser(authCredentialsDto);
    }
}
