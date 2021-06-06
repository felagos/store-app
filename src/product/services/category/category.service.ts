import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dto/category.dto';
import { Category } from '../../entities/category.entity';
import { CategoryRepository } from '../../repository/category.repository';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryRepository) private categoryRepo: CategoryRepository) { }

    findAll(): Promise<Category[]> {
        return this.categoryRepo.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepo.findOne(id);
        if (!category) throw new NotFoundException(`Category #${id} not found`);
        return category;
    }

    create(payload: CreateCategoryDto): Promise<Category> {
        return this.categoryRepo.createCategory(payload);
    }

    async update(id: number, changes: UpdateCategoryDto) {
        const brand = await this.findOne(id);
        return this.categoryRepo.updateCategory(brand, changes);
    }

    async remove(id: number): Promise<void> {
        const result = await this.categoryRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Category #${id} not found`);
    }
}