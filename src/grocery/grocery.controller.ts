import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Items } from './dto/items.dto';
import { GroceryService } from './grocery.service';
import { Response } from 'express';
import { Item } from 'src/db/item-details/item.entity';

@Controller("grocery")
export class GroceryController {
    constructor( private groceryService: GroceryService) {}

    @Post("/add-new-item")
    async addNewItem(@Body() body: Items[], @Res() res: Response): Promise<Response> {
        await this.groceryService.insertNewItem(body);
        return res.status(201).send("Item details added successfully!");
    }

    @Get("/")
    async getItemDetails(): Promise<Item[]> {
        return await this.groceryService.getItemDetails();
    }

    @Get("/active-products/")
    async getActiveItemDetails(): Promise<Item[]> {
        return await this.groceryService.getActiveItemDetails();
    }

    @Get("/:id")
    async getItemDetailsById(@Param('id') id: number): Promise<Item | null> {
        return await this.groceryService.getItemDetailsById(id);
    }

    @Delete("/delete-item/:id")
    async removeItemDetails(@Param('id') id: number) {
        await this.groceryService.removeItemDetails(id);
    }

    @Patch("/update-details/:id")
    async updateItemDetails(@Param('id') id: number, @Body() body: Partial<Items>) {
        await this.groceryService.updateItemDetails(id, body);
    }
}
