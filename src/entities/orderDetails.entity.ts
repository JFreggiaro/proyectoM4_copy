import { Column, Double, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

@Entity({
    name: "orderdetails"
})
export class OrderDetails {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /** Precio del producto @example 10000 */
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Orders, order => order.orderDetails)
    order: Orders;
  
    @ManyToMany(() => Products, product => product.orderDetails)
    products: Products[];
}