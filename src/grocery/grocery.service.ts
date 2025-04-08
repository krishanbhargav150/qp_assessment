import { Inject, Injectable } from '@nestjs/common';
import { Items } from './dto/items.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/db/item-details/item.entity';

@Injectable()
export class GroceryService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}

    async insertNewItem(body: Items) {
        return await this.itemRepository.save(body);
    }

    // async getItemDetails() {
    //     return await this.itemRepository;
    // }

    // async removeItemDetails(id: number) {
    //     return id;
    // }

    // async updateItemDetails(id: number, body: Items) {
    //     return body;
    // }
}
