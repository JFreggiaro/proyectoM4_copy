import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products.module';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './modules/categories.module';
import { SeederModule } from './modules/seeder.module';
import { OrdersModule } from './modules/orders.module';
import { FileModule } from './modules/file.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    //configuramos y cargamos las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    //inyectamos los metodos de las variables de entorno
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      //Utilizamos el modulo "typeorm"
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    SeederModule,
    OrdersModule,
    FileModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
