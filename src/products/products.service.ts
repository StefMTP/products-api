import { Injectable, NotFoundException } from '@nestjs/common';
import { productStatus } from './product-status.enum';
import { paramCase } from 'change-case';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { FilterProductDto } from './dto/filter-products.dto';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsRepository) private productsRepository: ProductsRepository) {}

    async getProducts(filterProductDto: FilterProductDto, user: User): Promise<Product[]> {
        return await this.productsRepository.getProducts(filterProductDto, user);
    }
    

    async getProductById(id: string, user: User): Promise<Product> {
        const product = await this.productsRepository.findOne({where: {user, id}});

        if(!product) {
            throw new NotFoundException("There is no product with such id");
        }

        return product;
    }

    async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
        return await this.productsRepository.createProduct(createProductDto, user);
    }
    
    
    async editProduct(id: string, updateProductDto: UpdateProductDto, user: User): Promise<Product> {
        const { title, description, product_type, status } = updateProductDto;
        const product = await this.getProductById(id, user);
        
        product.title = title;
        product.description = description;
        product.productType = product_type;
        product.status = status;

        this.productsRepository.save(product);
        
        return product;
    }

    async removeProduct(id: string, user: User): Promise<void> {
        const result = await this.productsRepository.delete({ id, user });
        if(result.affected === 0) {
            throw new NotFoundException('Product with such id does not exist.');
        }
    }

    async editProductStatus(id: string, updateProductStatusDto: UpdateProductStatusDto, user: User): Promise<Product> {
        const { status } = updateProductStatusDto;
        const product: Product = await this.getProductById(id, user);

        product.status = status;

        this.productsRepository.save(product);

        return product;
    }
}
