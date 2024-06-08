import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "../controllers/auth.controller";
import { UsersController } from "../controllers/users.controller";
import { Orders } from "../entities/orders.entity";
import { Users } from "../entities/users.entity";
import { UsersRepository } from "../repositories/users.repository";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Users,Orders])],
    controllers: [UsersController],
    providers:[UsersService, UsersRepository, AuthService, AuthController],
    exports: [UsersService]
})

export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('users')
    }
}