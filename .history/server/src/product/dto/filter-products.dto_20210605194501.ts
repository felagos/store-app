import { IsOptional, IsPositive, Min, ValidateIf } from "class-validator";

export class FilterProductsDto {

    @IsPositive()
    @IsOptional()
    minPrice: number;

    @ValidateIf(item => item.minPrice)
    @IsPositive()
    maxPrice: number;

}