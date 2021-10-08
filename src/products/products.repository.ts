import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { paramCase } from "change-case";
import { HttpException, InternalServerErrorException, Logger } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilterProductDto } from "./dto/filter-products.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    private logger = new Logger('ProductsRepository', {timestamp: true});
    
    async getProducts(filterProductDto: FilterProductDto, user: User): Promise<Product[]> {
        try {
            const { status, search } = filterProductDto;
            const query = this.createQueryBuilder('products');
            query.where({ user });

            if (status) {
                query.andWhere('products.status = :status', { status });
            }
            if (search) {
                query.andWhere('(LOWER(products.title) LIKE :search OR LOWER(products.description) LIKE LOWER(:search))', { search: `%${search}%` });
            }

            const products = await query.getMany();

            return products;
        } catch (err) {
            this.logger.error(`Failed to get tasks for user ${user.username} with filters ${JSON.stringify(filterProductDto)}`, err);
            throw new InternalServerErrorException();
        }
        
    }

    async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
        const { title, description, status } = createProductDto;

        const productFound = await this.findOne({ title });

        if(productFound) {
            throw new HttpException('Product with such title already exists.', 400);
        }

        const product = this.create({title, description, status, handle: paramCase(title), user});
        await this.save(product);

        return product;
    }
}