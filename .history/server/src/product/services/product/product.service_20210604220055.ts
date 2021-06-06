import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO, UpdateProductDTO } from '../../dto/product.dto';
import { Product } from '../../entities/product.entity';
import { BrandRepository } from '../../repository/brand.repository';
import { CategoryRepository } from '../../repository/category.repository';
import { ProductRepository } from '../../repository/product.repository';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
        @InjectRepository(BrandRepository) private brandRepository: BrandRepository,
        @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
        private brandService: BrandService) { }

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

    async update(id: number, changes: UpdateProductDTO): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (changes.brandId) {
            const brand = await this.brandRepository.findOne(changes.brandId);
            product.brand = brand;
        }
        if (changes.categoriesIds) {
            const categories = await this.categoryRepository.findByIds(
                changes.categoriesIds,
            );
            product.categories = categories;
        }
        this.productRepository.merge(product, changes);
        return this.productRepository.save(product);
    }

    async remove(id: number) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Product not found');
    }

    private async removeCategoryByProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne(productId, {
            relations: ['categories'],
        });
        product.categories = product.categories.filter(item => item.id !== categoryId);
        return this.productRepository.save(product);
    }

    private async addCategoryToProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne(productId, {
            relations: ['categories'],
        });
        const category = await this.categoryRepository.findOne(categoryId);
        product.categories.push(category);
        return this.productRepository.save(product);
    }

}


