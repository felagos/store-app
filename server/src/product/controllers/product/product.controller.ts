import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProductDTO } from '../../dto/product.dto';
import { ProductService } from '../../services/product/product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateProductDTO) {
        return this.productService.create(payload);
    }

}
