import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-products.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {  } from './product-status.enum';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Get()
    async getProducts(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
        return await this.productsService.getProducts(filterProductDto);
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto, @GetUser() user: User): Promise<Product> {
        return await this.productsService.createProduct(createProductDto, user);
    }

    @Put(':id')
    async editProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.productsService.editProduct(id, updateProductDto);
    }

    @Patch(':id/status')
    async editProductStatus(@Param('id') id: string, @Body() updateProductStatusDto: UpdateProductStatusDto): Promise<Product> {
        return await this.productsService.editProductStatus(id, updateProductStatusDto);
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string): Promise<void> {
        return await this.productsService.removeProduct(id);
    }
}
