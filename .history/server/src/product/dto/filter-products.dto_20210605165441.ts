import { IsOptional, IsPositive, Min } from "class-validator";

export class FilterProductsDto {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    @Min(0)
    offset: number;

}