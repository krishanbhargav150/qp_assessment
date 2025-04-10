import { Body, Controller, Post } from '@nestjs/common';
import { Order } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor( private orderService: OrderService) {}

    @Post('/book-order')
    async createOrder(@Body() body: Order) {
        return await this.orderService.createOrder(body);
    }
}
