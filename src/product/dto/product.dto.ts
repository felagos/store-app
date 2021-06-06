import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty()
    readonly image: string;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly brandId: number;

    @IsNotEmpty()
    @ApiProperty()
    readonly categoriesIds: number[];

}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}