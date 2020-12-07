import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Products } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }


    @Post()
    addProduct(
        @Body('title') productTitle: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ): any {
        const generateId = this.productsService.insertProduct(productTitle, description, price);
        return { id: generateId };
    }

    @Get()
    getAllProducts(): any {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(
        @Param('id') prodId: string
    ): any {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ): any {
        this.productsService.updateProduct(productId, title, description, price);
        return null;
    } 

    @Delete(':id')
    deleteProduct(@Param('id') productId: string): any {
        this.productsService.removeProduct(productId);
        return null;
    }
}