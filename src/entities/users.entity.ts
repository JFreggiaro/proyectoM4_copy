import { v4 as uuid } from 'uuid';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Role } from 'src/role.enum';


@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /** Nombre del usuario @example John */
  @Column({ length: 50, nullable: false })
  name: string;

  /** Email del usuario @example johndoe@mail.com */
  @Column({ length: 50, unique: false })
  email: string;

  /** Contraseña del usuario @example Password123! */
  @Column({ length: 100, nullable: false })
  password: string;

  /** Telefono del usuario @example 123456789 */
  @Column('int', { nullable: true })
  phone: number;

  /** Pais del usuario @example España */
  @Column({ length: 50, nullable: true })
  country: string;

  /** Direccion del usuario @example Mitre,123 */
  @Column('text', { nullable: true })
  address: string;

  /** Ciudad del usuario @example Lujan */
  @Column({ length: 50, nullable: true })
  city: string;

  /** Rol del usuario @example Admin */
  @Column({ default: Role.User})
  role: Role;

  /** Lista de ordenes del usuario */
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
