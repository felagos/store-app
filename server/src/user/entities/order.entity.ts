import { BaseEntity, Column, Entity } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {

    @Column({ unique: true })
    date: Date;

    user: User;
    
    products: Product[];
}