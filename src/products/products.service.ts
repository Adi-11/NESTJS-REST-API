import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './products.model';


@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
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
            updatedProduct.desc = description;
        }
        if (price) {
            updatedProduct.price = price;
        }

        this.products[index] = updatedProduct;
    }
    
    removeProduct(productId: string) {
        const [product, index] = this.findProduct(productId);

        this.products.splice(index, 1);
    }

    findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex(p => p.id === productId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException();
        }
        return [product, productIndex];
    }

}