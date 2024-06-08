import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "../controllers/orders.controller";
import { OrderDetails } from "../entities/orderDetails.entity";
import { Orders } from "../entities/orders.entity";
import { Products } from "../entities/products.entity";
import { Users } from "../entities/users.entity";
import { OrdersRepository } from "../repositories/orders.repository";
import { OrdersService } from "../services/orders.service";


@Module({
    imports: [TypeOrmModule.forFeature([Orders,Users,Products,OrderDetails])],
    controllers:[OrdersController],
    providers: [OrdersService, OrdersRepository]
})
export class OrdersModule{}