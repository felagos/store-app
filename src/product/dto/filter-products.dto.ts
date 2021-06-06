import { IsOptional, IsPositive, Min, ValidateIf } from "class-validator";
import { PaginationDto } from "./pagination.dto";

export class FilterProductsDto extends PaginationDto {

    @IsPositive()
    @IsOptional()
    minPrice: number;

    @ValidateIf(item => item.minPrice)
    @IsPositive()
    maxPrice: number;

}