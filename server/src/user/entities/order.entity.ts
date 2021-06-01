import { Product } from "../../product/entities/product.entity";
import { User } from "./user.entity";

export class Order {
    date: Date;
    user: User;
    products: Product[];
}