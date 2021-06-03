import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO, UpdateProductDTO } from '../../dto/product.dto';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repository/product.repository';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
        private brandService: BrandService) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async create(payload: CreateProductDTO): Promise<Product> {
        const brand = await this.brandService.findOne(payload.brandId);
        return this.productRepository.createProduct(payload, brand);
    }

    async update(id: number, payload: UpdateProductDTO): Promise<Product> {
        const product = await this.findOne(id);
        return this.productRepository.updateProduct(product, payload);
    }

    async remove(id:number) {
        const result = await this.productRepository.delete(id);
        if(result.affected === 0) throw new NotFoundException('Product not found');
    }

}


