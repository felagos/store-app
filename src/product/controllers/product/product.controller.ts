import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../auth/decorator/public.decorator';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Role } from '../../../auth/model/role.model';
import { FilterProductsDto } from '../../dto/filter-products.dto';
import { CreateProductDTO, UpdateProductDTO } from '../../dto/product.dto';
import { ProductService } from '../../services/product/product.service';

@ApiTags('product')
@Controller('product')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    @Public()
    findAll(@Query() filter: FilterProductsDto) {
        return this.productService.findAllPagination(filter);
    }

    @Get(':id')
    @Public()
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() payload: CreateProductDTO) {
        return this.productService.create(payload);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.productService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDTO) {
        return this.productService.update(id, payload);
    }

    @Delete(':id/category/:categoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeCategory(@Param('id', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) categoryId: number) {
        this.productService.removeCategoryByProduct(productId, categoryId);
    }

    @Put(':id/category/:categoryId')
    addCategoryToProduct(@Param('id') productId: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
        return this.productService.addCategoryToProduct(productId, categoryId);
    }

}
