import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { Category } from './category';
import { IProductInformation, ProductInformation } from './productInformation';
import { TotalOrderCount } from './totalOrderCount';
import { UserOrder } from './userOrder';

export interface IProduct {
    id: number,
    productName: string,
    productPhoto: string,
    description: string,
    productBigPhoto: string,
    productPrice: number,
    productWeight: number,
    categoryId: number,
    productInformation?: ProductInformation,
    totalOrderCount?: TotalOrderCount[],
    userOrderElement?: UserOrder[],
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

    @OneToMany(() => TotalOrderCount, (TotalOrderCount) => TotalOrderCount.product)
        totalOrderCount: TotalOrderCount[];

    @OneToMany(() => UserOrder, (UserOrder) => UserOrder.product)
        userOrderElement: UserOrder[];
}
