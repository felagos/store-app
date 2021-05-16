import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../../dto/CreateProductDto';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductService {

    private products: Product[] = [{
        id: 1,
        name: 'Product 1',
        description: 'Product Description',
        price: 122,
        image: '',
        stock: 10
    }];

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: number): Product {
        const product = this.products.find(product => product.id === id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    create(payload: CreateProductDto): Product {
        const newProduct = { id: Date.now(), ...payload };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: CreateProductDto) {
        let product = this.findOne(id);
        product = { id, ...payload };
        return product;
    }


}
