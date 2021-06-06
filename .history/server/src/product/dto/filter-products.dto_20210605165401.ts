import { IsOptional, IsPositive } from "class-validator";

export class FilterProductsDto {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;

}