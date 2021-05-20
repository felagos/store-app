import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { BrandService } from './services/brand/brand.service';
import { BrandController } from './controllers/brand/brand.controller';
import { CategoryController } from './controllers/category/category.controller';

@Module({
  controllers: [ProductController, BrandController, CategoryController],
  providers: [ProductService, BrandService, CategoryService]
})
export class ProductModule {}
