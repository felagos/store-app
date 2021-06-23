import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
import { Order } from '../../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';
import { CustomersService } from '../customers/customers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository) private userRepo: UserRepository,
        private customerService: CustomersService) { }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne(id);
        if (!user) throw new NotFoundException(`User #${id} not found`);
        return user;
    }

    async create(data: CreateUserDto) {
        const newCustomer = this.userRepo.create(data);
        newCustomer.password = await bcrypt.hash(newCustomer.password, 10);

        if (data.customerId) {
            const customer = await this.customerService.findOne(data.customerId);
            newCustomer.customer = customer;
        }
        return this.userRepo.createUser(newCustomer);
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
        return null;
    }

    findByEmail(email: string): Promise<User> {
        return this.userRepo.findByEmail(email);
    }

}