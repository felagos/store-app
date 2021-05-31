import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { BrandService } from './services/brand/brand.service';
import { CategoryController } from './controllers/category/category.controller';
import { ProductController } from './controllers/product/product.controller';
import { BrandController } from './controllers/brand/brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';
import { BrandRepository } from './repository/brand.repository';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, BrandRepository, CategoryRepository])
  ],
  controllers: [ProductController, BrandController, CategoryController],
  providers: [ProductService, BrandService, CategoryService],
  exports: [
    ProductService
  ]
})
export class ProductModule {}
