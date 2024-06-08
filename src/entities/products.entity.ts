import { Column, Double, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { Categories } from "./categories.entity";
import { OrderDetails } from "./orderDetails.entity";


@Entity({
    name: "products"
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /** Nombre del producto @example Iphone15 */
    @Column({ length: 50, nullable: false, unique: true })
    name: string;
  
    /** Descripcion del producto @example The best smartphone in the world */
    @Column('text', { nullable: false })
    description: string;
  
    /** Precio del producto @example 10000 */
    @Column('decimal',  {precision: 10, scale: 2, nullable: false })
    price: number;
  
    /** Stock del producto @example 10 */
    @Column('int', { nullable: false })
    stock: number;
  
    /** Imagen del proyecto @example https://example.com/iphone15.jpg */
    @Column({ default: 'default_image_url' })
    imgUrl: string;
  
    @ManyToOne(() => Categories, category => category.products)
    category: Categories;
  
    @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails[];
}
