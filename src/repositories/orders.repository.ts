import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../dto/order.dto';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Orders } from '../entities/orders.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(addOrder: CreateOrderDto): Promise<Orders> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: addOrder.userId },
        select: [
          'id',
          'name',
          'email',
        ],
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const order = new Orders();
      order.user = user;
      order.date = new Date();

      const orderDetails = new OrderDetails();
      orderDetails.price = 0;
      orderDetails.products = [];

      let total = 0;

      for (const product of addOrder.products) {
        const findProduct = await this.productsRepository.findOne({
          where: { id: product.id },
        });

        if (!findProduct) {
          throw new NotFoundException(
            `Producto con id ${product.id} no encontrado`,
          );
        }
        if (findProduct.stock <= 0) {
          throw new NotFoundException(
            `Producto con id ${product.id} no tiene stock`,
          );
        }

        const productPrice = parseFloat(findProduct.price as any);
        total += productPrice;
        findProduct.stock -= 1;
        await this.productsRepository.save(findProduct);

        orderDetails.products.push(findProduct);
      }

      orderDetails.price = parseFloat(total.toFixed(2));

      const savedOrderDetails =
        await this.orderDetailsRepository.save(orderDetails);

      order.orderDetails = savedOrderDetails;

      const savedOrder = await this.ordersRepository.save(order);

      return savedOrder;
    } catch (error) {
      throw new BadRequestException('Error al crear la orden');
    }
  }

  async getOrderById(orderId: string): Promise<any> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails', 'orderDetails.products', 'user'],
    });
    if (!order) {
      throw new NotFoundException('Pedido no encontrado');
    }

    return {
      message: 'Pedido encontrado',
      id: order.id,
      userId: order.user.id,
      date: order.date,
      total: order.orderDetails.price,
      products: order.orderDetails.products,
    };
  }

}
