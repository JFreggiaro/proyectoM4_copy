import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Products } from './products.entity';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /** Nombre de la categoria @example Smartphone */
  @Column({ unique: true, length: 50, nullable: false })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
