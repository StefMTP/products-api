import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { paramCase } from "change-case";
import { HttpException } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilterProductDto } from "./dto/filter-products.dto";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    
    async getProducts(filterProductDto: FilterProductDto): Promise<Product[]> {
        const { status, search } = filterProductDto;
        const query = this.createQueryBuilder('products');

        if (status) {
            query.andWhere('products.status = :status', { status });
        }
        if (search) {
            query.andWhere('LOWER(products.title) LIKE :search OR LOWER(products.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }

        const products = await query.getMany();

        return products;
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { title, description, status } = createProductDto;

        const productFound = await this.findOne({ title });

        if(productFound) {
            throw new HttpException('Product with such title already exists.', 400);
        }

        const product = this.create({title, description, status, handle: paramCase(title)});
        await this.save(product);

        return product;
    }
}