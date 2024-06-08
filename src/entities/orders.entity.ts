import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { OrderDetails } from "./orderDetails.entity";
import { Users } from "./users.entity";

@Entity({
    name: "orders"
})
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ManyToOne(() => Users, user => user.orders)
    user: Users;

    @Column('timestamp')
    date: Date;
  
    @OneToOne(() => OrderDetails, orderDetails => orderDetails.order, {onDelete: 'CASCADE'})
    @JoinColumn()
    orderDetails: OrderDetails;
}