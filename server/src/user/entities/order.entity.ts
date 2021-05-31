import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { User } from "./user.entity";

@Entity({ name: 'orders' })
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    date: Date;

    user: User;
    
    products: Product[];
}