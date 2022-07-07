import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { Category } from './category';

export interface IProductIngredient {
    id: number,
    productIngredientName: string,
    productPhoto: string,
    productPrice: number,
    productWeight: number,
    status: boolean,
    categoryId: number,
}

@Entity('productingredient', { database: CONSTANTS.DATA_BASE })
export class ProductIngredient extends DefaultValue implements IProductIngredient {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        productIngredientName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        productPhoto: string;

    @Column({
        type: 'int',
    })
        productPrice: number;

    @Column({
        type: 'int',
    })
        productWeight: number;

    @Column({
        type: 'boolean',
        default: false,
    })
        status: boolean;

    @Column({
        type: 'int',
    })
        categoryId: number;

    @ManyToOne(() => Category, (Category) => Category.productIngredients)
    @JoinColumn({ name: 'categoryId' })
        category: Category;
}
