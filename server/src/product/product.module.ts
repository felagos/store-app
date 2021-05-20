import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { BrandService } from './services/brand/brand.service';
import { CategoryController } from './controllers/category/category.controller';
import { ProductController } from './controllers/product/product.controller';
import { BrandController } from './controllers/brand/brand.controller';

@Module({
  controllers: [ProductController, BrandController, CategoryController],
  providers: [ProductService, BrandService, CategoryService]
})
export class ProductModule {}
