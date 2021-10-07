import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { productStatus } from "../product-status.enum";

export class FilterProductDto {
    @IsEnum(productStatus, {message: 'Status must be one of '+Object.values(productStatus)})
    @IsOptional()
    status?: productStatus;

    @IsString()
    @IsNotEmpty({message: 'The search parameter is empty'})
    @IsOptional()
    search?: string;
}