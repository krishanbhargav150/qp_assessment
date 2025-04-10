import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/db/order.entity';
import { Repository } from 'typeorm';
import { Sequences } from 'src/db/sequence.entity';
import { Item } from 'src/db/item-details/item.entity';

@Injectable()
export class OrderService {
    constructor(
            @InjectRepository(Orders)
            private readonly orderRepository: Repository<Orders>,

            @InjectRepository(Sequences)
            private readonly sequencesRepository: Repository<Sequences>,

            @InjectRepository(Item)
            private readonly itemRepository: Repository<Item>
        ) {}
    

    async createOrder(body: Order) {
        let totalQty = 0;
        let totalValue = 0;
        
        // Validate all items first
        for (const item of body.items) {
            const { productErpId, quantity, price } = item;
        
            const dbItem = await this.itemRepository.findOne({ where: { productErpId } });
        
            if (!dbItem) {
                throw new BadRequestException(`Item with productErpId ${productErpId} not found`);
            }
        
            if (dbItem.inventory < quantity) {
                throw new BadRequestException(`Not enough stock for product ${productErpId}`);
            }
        
            totalQty += quantity;
            totalValue += quantity * price;
        }
        
        const latestSequence = await this.sequencesRepository.find({
            order: { serialNo: 'DESC' },
            take: 1,
        });
        
        const latest = latestSequence[0];
        const newSerialNo = (latest?.serialNo ?? 0) + 1;
        
        await this.sequencesRepository.save({ serialNo: newSerialNo });
        
        const orderNo = await this.createNewOrderNo(newSerialNo);
        
        const order = {
            buyerName: body.buyerName,
            orderNo,
            totalQty,
            totalValue,
            items: body.items
        };
        
        await this.orderRepository.save(order);
        
        // Now update inventory
        for (const item of body.items) {
            const dbItem = await this.itemRepository.findOne({ where: { productErpId: item.productErpId } });
            if(dbItem){
            dbItem.inventory -= item.quantity;
            await this.itemRepository.save(dbItem);
            }
        }
        
    }

    async createNewOrderNo(serialNo: number): Promise<string> {
        const formatted = serialNo.toString().padStart(4, '0');
        return `SO-${formatted}`;
    }    
}
