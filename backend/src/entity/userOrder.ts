import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { DefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Category } from './category';
import { Product } from './product';

export interface IUserOrder {
    id: number,
    productName: string,
    productPhoto: string,
    productBigPhoto: string,
    productIngredients: string,
    description: string,
    productPrice: number,
    productWeight: number,
    totalCount: number,
    productId: number,
    categoryId: number,
}

@Entity('userorders', { database: CONSTANTS.DATA_BASE })
export class UserOrder extends DefaultValue implements IUserOrder {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
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
        nullable: true,
        default: null,
    })
        productBigPhoto: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        description: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        productIngredients: string;

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
        totalCount: number;

    @Column({
        type: 'int',
    })
        categoryId: number;

    @Column({
        type: 'int',
    })
        productId: number;

    @ManyToOne(() => Category, (Category) => Category.userOrderElement)
    @JoinColumn({ name: 'categoryId' })
        category: Category;

    @ManyToOne(() => Product, (Product) => Product.userOrderElement)
    @JoinColumn({ name: 'productId' })
        product: Product;
}
