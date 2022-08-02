import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { Category } from './category';
import { Product } from './product';

export interface ITotalOrderCount {
    id: number,
    productPrice: number,
    productId: number,
    categoryId: number,
    productUniqueData: string,
}

@Entity('totalordercount', { database: CONSTANTS.DATA_BASE })
export class TotalOrderCount extends DefaultValue implements ITotalOrderCount {
    @Column({
        type: 'int',
        default: 0,
    })
        productPrice: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        productUniqueData: string;

    @Column({
        type: 'int',
    })
        categoryId: number;

    @Column({
        type: 'int',
    })
        productId: number;

    @ManyToOne(() => Category, (Category) => Category.totalOrderCount)
    @JoinColumn({ name: 'categoryId' })
        category: Category;

    @ManyToOne(() => Product, (Product) => Product.totalOrderCount)
    @JoinColumn({ name: 'productId' })
        product: Product;
}
