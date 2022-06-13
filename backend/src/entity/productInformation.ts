import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { IProduct, Product } from './product';

export interface IProductInformation {
    id: number,
    productProteins: number,
    productCarbohydrates: number,
    productFats: number,
    productCalories: number,
    productId: number,
    product?: IProduct,
}

@Entity('productinformation', { database: CONSTANTS.DATA_BASE })
export class ProductInformation extends DefaultValue implements IProductInformation {
    @Column({
        type: 'int',
    })
        productProteins: number;

    @Column({
        type: 'int',
    })
        productCarbohydrates: number;

    @Column({
        type: 'int',
    })
        productFats: number;

    @Column({
        type: 'int',
    })
        productCalories: number;

    @Column({
        type: 'int',
        unique: true,
    })
        productId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
        product: Product;
}
