import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    role: string;

    @OneToOne(() => Customer, customer => customer.user, { nullable: true })
    @JoinColumn({ name: 'id_customer' })
    customer: Customer;

}