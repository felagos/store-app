import { Controller } from '@nestjs/common';
import { OrdersService } from '../../services/orders/orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrdersService) {}

}
