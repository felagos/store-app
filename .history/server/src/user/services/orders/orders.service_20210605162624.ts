import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../../dto/order.dto';
import { Customer } from '../../entities/customer.entity';
import { Order } from '../../entities/order.entity';
import { CustomerRepository } from '../../repository/customer.repository';
import { OrderRespository } from '../../repository/order.repository';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderRespository) private orderRepo: OrderRespository,
        @InjectRepository(CustomerRepository) private customerRepo: CustomerRepository
    ) {}

    findAll() {
        return this.orderRepo.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepo.findOne(id, {
            relations: ['items', 'items.product'],
        });
        if (!order) {
            throw new NotFoundException('not found');
        }
        return order;
    }

    async create(data: CreateOrderDto) {
        const order = this.orderRepo.create();
        if (data.customerId) {
            const customer = await this.customerRepo.findOne(data.customerId);
            order.customer = customer;
        }
        return this.orderRepo.save(order);
    }

    async update(id: number, changes: UpdateOrderDto) {
        const order = await this.orderRepo.findOne(id);
        if (changes.customerId) {
            const customer = await this.customerRepo.findOne(changes.customerId);
            order.customer = customer;
        }
        return this.orderRepo.save(order);
    }

    remove(id: number) {
        return this.orderRepo.delete(id);
    }
}