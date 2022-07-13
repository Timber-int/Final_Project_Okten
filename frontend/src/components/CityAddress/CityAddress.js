import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteCityAddressById } from '../../store/cityAddressSlice';
import css from './CityAddress.module.css';

const CityAddress = ({ address }) => {

    const {
        createdAt,
        addressName,
        id
    } = address;

    const dispatch = useDispatch();

    const deleteCityAddress = (id) => {
        dispatch(deleteCityAddressById({ id }));
    };

    return (
        <div className={css.city_address_box}>
            <div className={css.city_address_name}>AddressName: <span>{addressName}</span></div>
            <div>CreatedAt: {createdAt}</div>
            <div>
                <button onClick={() => deleteCityAddress(id)}>Delete</button>
            </div>
        </div>
    );
};

export { CityAddress };
