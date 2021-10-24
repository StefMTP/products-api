import { IsOptional, MaxLength } from "class-validator";

export class UpdateProductTagsDto {
    @IsOptional()
    @MaxLength(255)
    tag?: string;
}