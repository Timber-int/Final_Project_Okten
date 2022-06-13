import {
    Column, Entity, JoinColumn, ManyToOne, OneToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { Category } from './category';
import { IProductInformation, ProductInformation } from './productInformation';

export interface IProduct {
    id: number,
    productName: string,
    productPhoto: string,
    description: string,
    productPrice: number,
    productWeight: number,
    categoryId: number,
    productInformation?: ProductInformation,
}

@Entity('products', { database: CONSTANTS.DATA_BASE })
export class Product extends DefaultValue implements IProduct {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        productName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        productPhoto: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        description: string;

    @Column({
        type: 'int',
    })
        productPrice: number;

    @Column({
        type: 'int',
    })
        productWeight: number;

    @Column({
        type: 'int',
    })
        categoryId: number;

    @ManyToOne(() => Category, (Category) => Category.products)
    @JoinColumn({ name: 'categoryId' })
        category: Category;

    @OneToOne(() => ProductInformation, (productInformation: IProductInformation) => productInformation.product)
        productInformation: ProductInformation;
}
