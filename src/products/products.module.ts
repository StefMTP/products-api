import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsRepository]),
        AuthModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
