import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductSchema, Product } from 'src/models/products.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
