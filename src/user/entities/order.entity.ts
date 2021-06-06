import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Entity, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @ManyToOne(() => Customer, customer => customer.orders)
    @JoinColumn({ name: 'id_customer' })
    customer: Customer;

    @OneToMany(() => OrderItem, item => item.order)
    items: OrderItem[];
}