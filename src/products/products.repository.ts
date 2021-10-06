import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { paramCase } from "change-case";
import { HttpException } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { title, description, status } = createProductDto;

        const productFound = await this.find({ title });

        if(productFound.length) {
            throw new HttpException('Product with such title already exists.', 400);
        }

        const product = this.create({title, description, status, handle: paramCase(title)});
        await this.save(product);

        return product;
    }
}