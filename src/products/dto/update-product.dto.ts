import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { productStatus } from "../product-status.enum";

export class UpdateProductDto {
    @IsNotEmpty()
    @IsOptional()
    title?: string;
    
    @IsNotEmpty()
    @IsOptional()
    description?: string;
    
    @IsEnum(productStatus, {message: 'Status must be one of '+Object.values(productStatus)})
    @IsOptional()
    status?: productStatus;

    @IsOptional()
    product_type?: string;
}