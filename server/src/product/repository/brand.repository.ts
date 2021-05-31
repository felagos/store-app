import { EntityRepository, Repository } from "typeorm";
import { CreateBrandDto, UpdateBrandDto } from "../dto/brand.dto";
import { Brand } from "../entities/brand.entity";

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {

    async createBrand(brandDto: CreateBrandDto): Promise<Brand> {
        const brand = this.create(brandDto);
        await this.save(brand);

        return brand;
    }

    async updateBrand(brand: Brand, brandDto: UpdateBrandDto) {
        this.merge(brand, brandDto);
        return this.save(brand);
    }

}