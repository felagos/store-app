import { EntityRepository, Repository } from "typeorm";
import { OrderItem } from "../entities/order-item.entity";

@EntityRepository(OrderItem)
export class OrderItemResitory extends Repository<OrderItem> {

}