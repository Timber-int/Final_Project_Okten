import { Column, Entity } from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';

export interface ISliderData {
    pathUrl: string,
    text: string,
}

@Entity('sliderdata', { database: CONSTANTS.DATA_BASE })
export class SliderData extends DefaultValue implements ISliderData {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        pathUrl: string;

    @Column({
        type: 'mediumtext',
        nullable: false,
    })
        text: string;
}
