import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Product } from './product';
import { ProductIngredient } from './productIngredient';

export interface ICategory extends IDefaultValue {
    id: number,
    name: string,
    logo: string,
    products?: Product[],
    productIngredients?: ProductIngredient[],
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
}
