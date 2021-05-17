import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from '../../dto/product.dto';
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

    create(payload: CreateProductDTO): Product {
        const newProduct = { id: Date.now(), ...payload };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: UpdateProductDTO) {
        let product = this.findOne(id);

        product.description = payload.description;
        product.image = payload.image;
        product.name = payload.name;
        product.price = payload.price;
        product.stock = payload.stock;

        return product;
    }


}
