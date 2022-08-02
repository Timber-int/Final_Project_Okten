import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCityByName } from '../../store';
import css from './UserChosenAddress.module.css';

const UserChosenAddress = () => {

    const dispatch = useDispatch();

    const city = localStorage.getItem('city');

    useEffect(() => {
        dispatch(getCityByName({ cityName: city }));
    }, [city]);

    const {
        city: cityFromDB,
        filterCityAddress,
    } = useSelector(state => state['cityReducer']);

    return (
        <div className={css.city_block}>
            <div className={css.city_box}>{cityFromDB ? cityFromDB.cityName : city}</div>
            <ul className={css.address_box}>
                {
                    filterCityAddress.map(address => (
                            <li className={css.address_name} key={address.id}>
                                {address.addressName}
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
};

export { UserChosenAddress };
