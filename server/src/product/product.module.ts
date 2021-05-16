import { Module } from '@nestjs/common';
import { ProductController } from './controller/products/product.controller';
import { ProductService } from './services/product/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
