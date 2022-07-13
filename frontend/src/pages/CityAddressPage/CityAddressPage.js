import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '../../store';
import { NavLink, Outlet } from 'react-router-dom';
import css from './CityAddressPage.module.css';

const CityAddressPage = () => {
    const dispatch = useDispatch();

    const {
        cities,
    } = useSelector(state => state['cityReducer']);

    useEffect(() => {
        if (cities.length === 0) {
            dispatch(getAllCities());
        }
    }, [cities]);

    return (
        <div className={css.cities_container}>
            {
                cities.map(city => (
                    <div key={city.id} className={css.city_data_box}>
                        <NavLink to={'/adminPage/cityAddress/cityAddressDetails/' + city.id} state={city}
                                 className={css.city_name}>{city.cityName}
                        </NavLink>
                    </div>
                ))
            }
            <div className={css.content_container}>
                <Outlet/>
            </div>
        </div>
    );
};

export { CityAddressPage };
