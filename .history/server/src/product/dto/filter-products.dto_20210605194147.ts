import { IsOptional, IsPositive, Min, ValidateIf } from "class-validator";

export class FilterProductsDto {

    @IsPositive()
    limit: number;

    @Min(0)
    offset: number;

    @Min(0)
    page: number;

    @IsPositive()
    @IsOptional()
    minPrice: number;

    @ValidateIf(item => item.minPrice)
    @IsPositive()
    maxPrice: number;

}