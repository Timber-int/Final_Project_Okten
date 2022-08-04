import { Column, Entity } from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';

export interface IPartnersRequest {
    id: number,
    name: string,
    email: string,
    phone: string,
    message: string,
}

@Entity('partnersrequest', { database: CONSTANTS.DATA_BASE })
export class PartnersRequest extends DefaultValue implements IPartnersRequest {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        name: string;

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
        phone: string;

    @Column({
        type: 'text',
        nullable: false,
    })
        message: string;
}
