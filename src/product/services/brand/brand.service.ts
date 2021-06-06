import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../../dto/brand.dto';
import { Brand } from '../../entities/brand.entity';
import { BrandRepository } from '../../repository/brand.repository';

@Injectable()
export class BrandService {

    constructor(@InjectRepository(BrandRepository) private brandRepository: BrandRepository) {}

    findAll(): Promise<Brand[]> {
        return this.brandRepository.find();
    }

    async findOne(id: number): Promise<Brand> {
        const brand = await this.brandRepository.findOne(id);
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return brand;
    }

    create(payload: CreateBrandDto): Promise<Brand> {
        return this.brandRepository.createBrand(payload);
    }

    async update(id: number, changes: UpdateBrandDto): Promise<Brand> {
        const product = await this.findOne(id);
        return this.brandRepository.updateBrand(product, changes);
    }

    async remove(id: number): Promise<void> {
        const result = await this.brandRepository.delete(id);
        if(result.affected === 0) throw new NotFoundException('Brand not found');
    }
}