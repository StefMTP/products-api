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
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateProductTagsDto } from './dto/update-product-tags.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    private logger = new Logger('ProductsController');

    constructor(private productsService: ProductsService, private configService: ConfigService) {}
    
    @Get()
    async getProducts(@Query() filterProductDto: FilterProductDto, @GetUser() user: User): Promise<Product[]> {
        this.logger.verbose(`User ${user.username} is fetching products with filters: ${JSON.stringify(filterProductDto)}`);
        return await this.productsService.getProducts(filterProductDto, user);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string, @GetUser() user: User): Promise<Product> {
        return await this.productsService.getProductById(id, user);
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto, @GetUser() user: User): Promise<Product> {
        this.logger.verbose(`User ${user.username} is creating a new product with data: ${JSON.stringify(createProductDto)}`)
        return await this.productsService.createProduct(createProductDto, user);
    }

    @Post('factory')
    async createRandomProducts(@GetUser() user: User): Promise<Product[]> {
        this.logger.verbose(`Running product factories for user ${user.username}...`);
        return await this.productsService.createRandomProducts(user);
    }

    @Put(':id')
    async editProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @GetUser() user: User): Promise<Product> {
        return await this.productsService.editProduct(id, updateProductDto, user);
    }

    @Patch(':id/status')
    async editProductStatus(@Param('id') id: string, @Body() updateProductStatusDto: UpdateProductStatusDto, @GetUser() user: User): Promise<Product> {
        return await this.productsService.editProductStatus(id, updateProductStatusDto, user);
    }

    @Patch(':id/addTag')
    async addProductTag(@Param('id') id: string, @Body() updateProductTagsDto: UpdateProductTagsDto, @GetUser() user: User): Promise<Product> {
        return await this.productsService.addProductTag(id, updateProductTagsDto, user);
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return await this.productsService.removeProduct(id, user);
    }
}
