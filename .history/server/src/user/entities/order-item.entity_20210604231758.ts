import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity({ name: 'orders-items' })
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'id_product' })
    product: Product;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'id_order' })
    order: Order;
}