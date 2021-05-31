import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
import { Order } from '../../entities/order.entity';
import { ProductService } from '../../../product/services/product/product.service';

@Injectable()
export class UsersService {

    constructor(private productService: ProductService) {}

    findAll() {
        return [];
    }

    findOne(id: number) {
        return null;
    }

    create(data: CreateUserDto) {
        return null;
    }

    update(id: number, changes: UpdateUserDto) {
        return null;
    }

    remove(id: number) {
        return null;
    }

    getOrderByUser(id: number): Order {
        return null;
    }

}