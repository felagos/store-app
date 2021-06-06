import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProductsDto } from '../../dto/filter-products.dto';
import { CreateProductDTO, UpdateProductDTO } from '../../dto/product.dto';
import { Product } from '../../entities/product.entity';
import { BrandRepository } from '../../repository/brand.repository';
import { CategoryRepository } from '../../repository/category.repository';
import { ProductRepository } from '../../repository/product.repository';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
        @InjectRepository(BrandRepository) private brandRepository: BrandRepository,
        @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) { }

    findAll(filter: FilterProductsDto): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async create(payload: CreateProductDTO): Promise<Product> {
        const newProduct = this.productRepository.create(payload);
        if (payload.brandId) {
            const brand = await this.brandRepository.findOne(payload.brandId);
            newProduct.brand = brand;
        }
        if (payload.categoriesIds) {
            const categories = await this.categoryRepository.findByIds(payload.categoriesIds);
            newProduct.categories = categories;
        }
        return this.productRepository.save(newProduct);
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

    async removeCategoryByProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne(productId, {
            relations: ['categories'],
        });
        product.categories = product.categories.filter(item => item.id !== categoryId);
        return this.productRepository.save(product);
    }

    async addCategoryToProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne(productId, {
            relations: ['categories']
        });
        const category = await this.categoryRepository.findOne(categoryId);
        product.categories.push(category);
        return this.productRepository.save(product);
    }

}


