import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Product, ProductSchema, ProductDocument } from "src/models/products.model"
import {Products} from 'src/products/products.model'
@Injectable()
export class ProductsService {
    private products: Products[] = [];

    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description,
            price
        });
        const result = await newProduct.save();
        console.log(result);
    }
    
    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }

        // this.products[index] = updatedProduct;
    }
    
    removeProduct(productId: string) {
        const [product, index] = this.findProduct(productId);

        this.products.splice(index, 1);
    }

    findProduct(productId: string): any {
        const productIndex = this.products.findIndex(p => p.id === productId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException();
        }
        // return [product, productIndex];
    }
    
}