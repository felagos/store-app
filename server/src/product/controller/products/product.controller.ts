import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from '../../dto/CreateProductDto';
import { ProductService } from '../../services/product/product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateProductDto) {
        return this.productService.create(payload);
    }

}
