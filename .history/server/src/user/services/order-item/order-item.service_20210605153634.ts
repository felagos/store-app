import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../product/entities/product.entity';
import { CreateOrderItemDto } from '../../dto/order-item.dto';
import { OrderItem } from '../../entities/order-item.entity';
import { Order } from '../../entities/order.entity';

@Injectable()
export class OrderItemService {
    constructor(
      @InjectRepository(Order) private orderRepo: Repository<Order>,
      @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
      @InjectRepository(Product) private productRepo: Repository<Product>,
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