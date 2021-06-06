import { EntityRepository, Repository } from "typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { Category } from "../entities/category.entity";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.create(categoryDto);
        await this.save(category);

        return category;
    }

    async updateCategory(category: Category, categoryDto: UpdateCategoryDto): Promise<Category> {
        this.merge(category, categoryDto);
        return this.save(category);
    }

}