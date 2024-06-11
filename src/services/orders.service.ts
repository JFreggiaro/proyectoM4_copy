import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';
import { OrdersRepository } from '../repositories/orders.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  getOrderById(id: string) {
    return this.orderRepository.getOrderById(id);
  }

  async addOrder(addOrder: CreateOrderDto) {
    return await this.orderRepository.addOrder(addOrder);
  }


}
