import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dto/customer.dto';
import { CustomerRepository } from '../../repository/customer.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {

    constructor(@InjectRepository(CustomerRepository) private customerRepo: CustomerRepository) { }

    findAll(): Promise<Customer[]> {
        return this.customerRepo.find();
    }

    async findOne(id: number) {
        const customer = await this.customerRepo.findOne(id);
        if (!customer) throw new NotFoundException(`Customer #${id} not found`);
        return customer;
    }

    create(data: CreateCustomerDto): Promise<Customer> {
        return this.customerRepo.createCostumer(data);
    }

    async update(id: number, changes: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.findOne(id);
        return this.customerRepo.updateCustomer(customer, changes);
    }

    async remove(id: number) {
        const results = await this.customerRepo.delete(id);
        if(results.affected === 0) throw new NotFoundException(`Customer #${id} not found`);
    }
}