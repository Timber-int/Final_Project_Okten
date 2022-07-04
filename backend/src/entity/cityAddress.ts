import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { DefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { ICity, City } from './city';

export interface ICityAddress {
    id: number,
    addressName: string,
    cityId: number,
    city?: ICity,
}

@Entity('cityAddress', { database: CONSTANTS.DATA_BASE })
export class CityAddress extends DefaultValue implements ICityAddress {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        addressName: string;

    @Column({
        type: 'int',
    })
        cityId: number;

    @ManyToOne(() => City, (city) => city.cityAddress)
    @JoinColumn({ name: 'cityId' })
        city: ICity;
}
