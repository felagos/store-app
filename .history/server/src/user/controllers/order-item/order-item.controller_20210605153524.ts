import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../../dto/order-item.dto';

@Controller('order-item')
export class OrderItemController {

    constructor(private itemsService: OrderItemService) { }

    @Post()
    create(@Body() payload: CreateOrderItemDto) {
        return this.itemsService.create(payload);
    }

}
