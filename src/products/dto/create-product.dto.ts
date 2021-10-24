import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { productStatus } from "../product-status.enum";

export class CreateProductDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsEnum(productStatus, {message: 'Status must be one of '+Object.values(productStatus)})
    @IsOptional()
    status?: productStatus;
}