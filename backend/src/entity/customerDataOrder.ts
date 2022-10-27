import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { User } from './user';
import { CustomerProductsForOrder } from './customerProductsForOrder';

export interface ICustomerDataOrder extends IDefaultValue {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    city: string,
    street: string,
    houseNumber: number,
    orderComment: string,
    entrance: number,
    flour: number,
    office: number,
    intercom: number,
    addressComment: string,
    totalOrderCount: number,
    usedOrderType: string,
    servetStatus: boolean,
    products?: CustomerProductsForOrder[];
}

@Entity('customerorders', { database: CONSTANTS.DATA_BASE })
export class CustomerDataOrder extends DefaultValue implements ICustomerDataOrder {
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
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        city: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        street: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        houseNumber: number;

    @Column({
        type: 'text',
    })
        orderComment: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        entrance: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        flour: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        office: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        intercom: number;

    @Column({
        type: 'text',
    })
        addressComment: string;

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

    @ManyToOne(() => User, (User) => User.customerOrder)
    @JoinColumn({ name: 'email' })
        user: User;

    @OneToMany(() => CustomerProductsForOrder, (CustomerProductsForOrder) => CustomerProductsForOrder.customer)
        products: CustomerProductsForOrder[];
}
