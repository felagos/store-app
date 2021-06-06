import { IsOptional, IsPositive, Min } from "class-validator";

export class FilterProductsDto {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @Min(0)
    page: number;

}