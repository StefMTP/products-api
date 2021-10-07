import { BadRequestException, ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        try {
            const { username, password, password_confirmation, email } = authCredentialsDto;

            if(password !== password_confirmation) {
                throw new BadRequestException('Password confirmation does not match the original input.');
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const user = this.create({username, password: passwordHash, email});
            await this.save(user);
    
            return;
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('A user is already registered with this email.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}