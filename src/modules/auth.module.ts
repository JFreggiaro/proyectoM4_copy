import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "../controllers/auth.controller";
import { UsersRepository } from "../repositories/users.repository";
import { AuthService } from "../services/auth.service";
import { Users } from "../entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository],
})
export class AuthModule{}