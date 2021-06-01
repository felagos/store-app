import { EntityRepository, Repository } from "typeorm";
import { CreateCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";
import { Customer } from "../entities/customer.entity";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    createCostumer(customerDto: CreateCustomerDto): Promise<Customer> {
        const customerNew = this.create(customerDto);
        return this.save(customerNew);
    }

    updateCustomer(customer: Customer, changes: UpdateCustomerDto): Promise<Customer> {
        this.merge(customer, changes);
        return this.save(customer);
    }

}