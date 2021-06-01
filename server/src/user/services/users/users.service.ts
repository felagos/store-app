import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
import { Order } from '../../entities/order.entity';
import { ProductService } from '../../../product/services/product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository) private userRepo: UserRepository,
        private productService: ProductService) { }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne(id);
        if (!user) throw new NotFoundException(`User #${id} not found`);
        return user;
    }

    create(data: CreateUserDto) {
        return this.userRepo.createUser(data);
    }

    async update(id: number, changes: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        return this.userRepo.updateUser(user, changes);
    }

    async remove(id: number): Promise<void> {
        const result = await this.userRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException(`User #${id} not found`);
    }

    async getOrderByUser(id: number): Promise<Order> {
        const user = await this.findOne(id);
        return {
            date: new Date(),
            user,
            products: await this.productService.findAll()
        };
    }

}