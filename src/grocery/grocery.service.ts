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

    async insertNewItem(body: Items[]) {
        for (const item of body) {
          const existingItem = await this.itemRepository.findOne({
            where: {
              productErpId: item.productErpId,
              isDeleted: false,
            },
          });
      
          if (existingItem) {
            throw new Error(`${item.productErpId} already exists and is not deleted.`);
          }
        }
      
        return await this.itemRepository.save(body);
      }
      

    async getItemDetails(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    async getActiveItemDetails(): Promise<Item[]> {
        return await this.itemRepository.find({ where: { isDeleted: false }});
    }

    async getItemDetailsById(id: number): Promise<Item | null> {
        return await this.itemRepository.findOne({
            where: { id, isDeleted: false }
        });
    }

    async removeItemDetails(id: number): Promise<boolean> {
        const result = await this.itemRepository.update({ id }, { isDeleted: true });
        return (result.affected ?? 0) > 0;
    }

    async updateItemDetails(id: number, body: Partial<Items>) {
        return await this.itemRepository.update({ id }, body);
    }
}
