import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { CustomerDataOrder } from './customerDataOrder';

export interface ICustomerProductsForOrder {
    id: number,
    productName: string,
    productPhoto: string,
    description: string,
    productBigPhoto: string,
    productPrice: number,
    productWeight: number,
    customerId: number,
    categoryId: number,
    productId: number,
    productIngredients: string,
    customer?: CustomerDataOrder;
}

@Entity('customerproductsfororder', { database: CONSTANTS.DATA_BASE })
export class CustomerProductsForOrder extends DefaultValue implements ICustomerProductsForOrder {
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
        categoryId: number;

    @Column({
        type: 'int',
    })
        productId: number;

    @Column({
        type: 'int',
    })
        customerId: number;

    @ManyToOne(() => CustomerDataOrder, (CustomerDataOrder) => CustomerDataOrder.products)
    @JoinColumn({ name: 'customerId' })
        customer: CustomerDataOrder;
}
