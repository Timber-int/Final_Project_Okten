import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Product } from './product';
import { ProductIngredient } from './productIngredient';
import { TotalOrderCount } from './totalOrderCount';
import { UserOrder } from './userOrder';

export interface ICategory extends IDefaultValue {
    id: number,
    name: string,
    logo: string,
    products?: Product[],
    productIngredients?: ProductIngredient[],
    totalOrderCount?: TotalOrderCount[],
    userOrderElement?: UserOrder[],
}

@Entity('categories', { database: CONSTANTS.DATA_BASE })
export class Category extends DefaultValue implements ICategory {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        name: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        logo: string;

    @OneToMany(() => Product, (Product) => Product.category)
        products: Product[];

    @OneToMany(() => ProductIngredient, (ProductIngredient) => ProductIngredient.category)
        productIngredients: ProductIngredient[];

    @OneToMany(() => TotalOrderCount, (TotalOrderCount) => TotalOrderCount.category)
        totalOrderCount: TotalOrderCount[];

    @OneToMany(() => UserOrder, (UserOrder) => UserOrder.category)
        userOrderElement: UserOrder[];
}
