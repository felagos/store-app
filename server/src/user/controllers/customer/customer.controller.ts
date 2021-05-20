import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dto/customer.dto';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customer')
export class CustomerController {
    constructor(private customersService: CustomersService) { }

    @Get()
    findAll() {
        return this.customersService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateCustomerDto) {
        return this.customersService.create(payload);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDto) {
        return this.customersService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.remove(+id);
    }
}