import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Items } from './dto/items.dto';
import { GroceryService } from './grocery.service';
import { Response } from 'express';

@Controller("grocery")
export class GroceryController {
    constructor( private groceryService: GroceryService) {}

    @Post("/add-new-item")
    async addNewItem(@Body() body: Items, @Res() res: Response): Promise<Response> {
        await this.groceryService.insertNewItem(body);
        return res.status(201).send("Item details added successfully!");
    }

    // @Get("/")
    // async getItemDetails() {
    //     await this.groceryService.getItemDetails();
    // }

    // @Delete("/:id")
    // async removeItemDetails(@Param('id') id: number) {
    //     await this.groceryService.removeItemDetails(id);
    // }

    // @Patch("/:id")
    // async updateItemDetails(@Param('id') id: number, @Body() body: Items) {
    //     await this.groceryService.updateItemDetails(id, body);
    // }
}
