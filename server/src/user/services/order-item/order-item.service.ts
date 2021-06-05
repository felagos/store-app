import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../../../product/repository/product.repository';
import { CreateOrderItemDto } from '../../dto/order-item.dto';
import { OrderItem } from '../../entities/order-item.entity';
import { OrderItemResitory } from '../../repository/order-item.repository';
import { OrderRespository } from '../../repository/order.repository';

@Injectable()
export class OrderItemService {
    constructor(
      @InjectRepository(OrderRespository) private orderRepo: OrderRespository,
      @InjectRepository(OrderItemResitory) private itemRepo: OrderItemResitory,
      @InjectRepository(ProductRepository) private productRepo: ProductRepository,
    ) {}
  
    async create(data: CreateOrderItemDto) {
      const order = await this.orderRepo.findOne(data.orderId);
      const product = await this.productRepo.findOne(data.productId);
      const item = new OrderItem();
      item.order = order;
      item.product = product;
      item.quantity = data.quantity;
      return this.itemRepo.save(item);
    }
  }