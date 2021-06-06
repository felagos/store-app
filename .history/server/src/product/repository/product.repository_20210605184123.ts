import { EntityRepository, Repository } from "typeorm";
import { FilterProductsDto } from "../dto/filter-products.dto";
import { PaginationResponseDto } from "../dto/pagination-response.dto";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { Brand } from "../entities/brand.entity";
import { Product } from "../entities/product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    async createProduct(productDto: CreateProductDTO, brand: Brand): Promise<Product> {
        const product = this.create(productDto);
        product.brand = brand;
        await this.save(product);

        return product;
    }

    async updateProduct(product: Product, productDto: UpdateProductDTO) {
        this.merge(product, productDto);
        return this.save(product);
    }

    async findAllPagination(filter: FilterProductsDto): Promise<PaginationResponseDto<Product[]>> {
        const { limit, offset, page } = filter;


        const [result, total] = await this.findAndCount({
            relations: ['brand'],
            take: limit,
            skip: offset
        });

        const currentPage = page;
        const lastPage = Math.ceil(total / limit);
        const nextPage = page + 1 > lastPage ? null = page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: result,
            currentPage,
            lastPage,
            nextPage,
            prevPage,
            total
        }

    }

}