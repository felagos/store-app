import { EntityRepository, Repository } from "typeorm";
import { FilterProductsDto } from "../dto/filter-products.dto";
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

    findAllByFiltering(filter: FilterProductsDto) {
        const where = { relations: ['brand']  };
        if(filter)  {
            const { limit, offset } = filter;
            where['take'] = limit;
            where['skip'] = offset;
        }

        return this.find(where);
    }
    
}