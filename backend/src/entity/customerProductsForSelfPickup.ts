import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { CustomerDataSelfPickupOrder } from './customerDataSelfPickupOrder';

export interface ICustomerProductsForSelfPickup {
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
}

@Entity('customerproductsforselfpickup', { database: CONSTANTS.DATA_BASE })
export class CustomerProductsForSelfPickup extends DefaultValue implements ICustomerProductsForSelfPickup {
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

    @ManyToOne(() => CustomerDataSelfPickupOrder, (CustomerDataSelfPickupOrder) => CustomerDataSelfPickupOrder.products)
    @JoinColumn({ name: 'customerId' })
        customer: CustomerDataSelfPickupOrder;
}
