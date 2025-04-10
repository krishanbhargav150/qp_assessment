import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroceryController } from './grocery/grocery.controller';
import { GroceryService } from './grocery/grocery.service';
import { GroceryModule } from './grocery/grocery.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './db/item-details/item.entity';
import { Sequences } from './db/sequence.entity';
import { Orders } from './db/order.entity';
import { OrderItems } from './db/order-items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Krishan@150',
      database: 'qp_assessment_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GroceryModule, OrderModule, TypeOrmModule.forFeature([Item, Sequences, Orders, OrderItems])],
  controllers: [AppController, GroceryController, OrderController],
  providers: [AppService, GroceryService, OrderService],
})
export class AppModule {}
