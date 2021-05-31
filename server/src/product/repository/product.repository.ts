import { EntityRepository, Repository } from "typeorm";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { Product } from "../entities/product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    async createProduct(productDto: CreateProductDTO): Promise<Product> {
        const product = this.create(productDto);
        await this.save(product);

        return product;
    }

    async updateProduct(product: Product, productDto: UpdateProductDTO) {
        this.merge(product, productDto);
        return this.save(product);
    }
    
}