import { Body, Controller, Post, Res } from '@nestjs/common';
import { Order } from './dto/order.dto';
import { OrderService } from './order.service';
import { Response } from 'express';

@Controller('order')
export class OrderController {
    constructor( private orderService: OrderService) {}

    @Post('/book-order')
    async createOrder(@Body() body: Order, @Res() res: Response): Promise<Response> {
         await this.orderService.createOrder(body);
         return res.status(201).send("Order created successfully!");
    }
}
