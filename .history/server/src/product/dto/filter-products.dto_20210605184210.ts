import { IsPositive, Min } from "class-validator";

export class FilterProductsDto {

    @IsPositive()
    limit: number;

    @Min(0)
    offset: number;

    @Min(0)
    page: number;

}