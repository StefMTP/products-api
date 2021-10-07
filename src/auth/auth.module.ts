import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({secret: "HF9KS`7<7.8cbsS:PDp,[OXQx#I$8W", signOptions: {expiresIn: 3600}})
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
