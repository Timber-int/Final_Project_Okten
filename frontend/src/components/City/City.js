import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteCityById } from '../../store';
import css from './City.module.css';

const City = ({ city }) => {

    const dispatch = useDispatch();

    const {
        cityName,
        createdAt,
        id,
    } = city;

    const deleteCity = (id) => {
        dispatch(deleteCityById({ id }));
    };

    return (
        <div className={css.city_box}>
            <div className={css.city_name}>CityName: <span>{cityName}</span></div>
            <div>CreatedAt: {createdAt}</div>
            <div>
                <button onClick={() => deleteCity(id)}>Delete</button>
            </div>
        </div>
    );
};

export { City };
