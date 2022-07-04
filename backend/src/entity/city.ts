import { Column, Entity, OneToMany } from 'typeorm';

import { DefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { CityAddress, ICityAddress } from './cityAddress';

export interface ICity {
    id: number;
    cityName: string,
    cityAddress?:ICityAddress[]
}

@Entity('cities', { database: CONSTANTS.DATA_BASE })
export class City extends DefaultValue implements ICity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        cityName: string;

    @OneToMany(() => CityAddress, (cityAddress:ICityAddress) => cityAddress.city)
        cityAddress: ICityAddress[];
}
