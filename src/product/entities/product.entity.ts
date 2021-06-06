import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brand.entity";
import { Category } from "./category.entity";

@Entity({ name: 'products' })
@Index(['price', 'stock'])
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column()
    image: string;

    @Exclude()
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Brand, { eager: true })
    @JoinColumn({ name: 'id_brand' })
    brand: Brand;

    @ManyToMany(() => Category, category => category.products)
    @JoinTable({ name: 'products_category' })
    categories: Category[];

}