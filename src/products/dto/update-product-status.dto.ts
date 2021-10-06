import { IsEnum, IsOptional } from "class-validator";
import { productStatus } from "../product-status.enum";

export class UpdateProductStatusDto {
    @IsEnum(productStatus, {message: 'Status must be one of '+Object.values(productStatus)})
    @IsOptional()
    status?: productStatus;
}