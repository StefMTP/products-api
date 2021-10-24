import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { FilterProductDto } from './dto/filter-products.dto';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from 'src/auth/user.entity';
import { UpdateProductTagsDto } from './dto/update-product-tags.dto';

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

        await this.productsRepository.save(product);
        
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
        
        await this.productsRepository.save(product);
        
        return product;
    }
    
    async addProductTag(id: string, updateProductTagsDto: UpdateProductTagsDto, user: User): Promise<Product> {
        const { tag } = updateProductTagsDto;
        const product: Product = await this.getProductById(id, user);

        if(!product.tags) {
            product.tags = `${tag};`;
        } else {
            if((product.tags.length + tag.length) > 255) {
                throw new ConflictException("Tags exceed the max length with the new tag");
            }
            product.tags += `${tag};`;
        }

        await this.productsRepository.save(product);
        return product;
    }

    async removeProductTag(id: string, updateProductTagsDto: UpdateProductTagsDto, user: User): Promise<void> {
        const { tag } = updateProductTagsDto;
        const product = await this.getProductById(id, user);

        const productTags = product.tags.split(';');

        if(!productTags.includes(tag)) {
            throw new ConflictException("Couldn't find the tag in this product's tags.");
        }

        product.tags = productTags.filter(el => el !== tag).join(';');

        await this.productsRepository.save(product);

    }

    async createRandomProducts(user: User): Promise<Product[]> {
        return await this.productsRepository.createRandomProducts(user);
    }
}
