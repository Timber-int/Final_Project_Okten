import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { User } from './user';
import { CustomerProductsForSelfPickup } from './customerProductsForSelfPickup';

export interface ICustomerDataSelfPickupOrder extends IDefaultValue {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    orderComment: string,
    address: string,
    totalOrderCount: number,
    usedOrderType: string,
    servetStatus: boolean,
    products?: CustomerProductsForSelfPickup[];
}

@Entity('customerselfpickuporders', { database: CONSTANTS.DATA_BASE })
export class CustomerDataSelfPickupOrder extends DefaultValue implements ICustomerDataSelfPickupOrder {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        email: string;

    @Column({
        type: 'text',
    })
        orderComment: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        totalOrderCount: number;

    @Column({
        type: 'boolean',
        nullable: false,
        default: 'false',
    })
        servetStatus: boolean;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        usedOrderType: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        address: string;

    @ManyToOne(() => User, (User) => User.customerOrderSelfPickup)
    @JoinColumn({
        name: 'email',
    })
        userSelfPickup: User;

    @OneToMany(() => CustomerProductsForSelfPickup, (CustomerProductsForSelfPickup) => CustomerProductsForSelfPickup.customer)
        products: CustomerProductsForSelfPickup[];
}
