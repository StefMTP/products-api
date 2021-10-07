import { HttpException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, email } = authCredentialsDto;

        const userFound = await this.findOne({ email });

        if(userFound) {
            throw new HttpException('User is already registered with this email.', 400);
        }

        const user = this.create({username, password, email});
        await this.save(user);

        return;
    }
}