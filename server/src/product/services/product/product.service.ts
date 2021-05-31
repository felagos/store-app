import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO, UpdateProductDTO } from '../../dto/product.dto';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repository/product.repository';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    create(payload: CreateProductDTO): Promise<Product> {
        return this.productRepository.createProduct(payload);
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
