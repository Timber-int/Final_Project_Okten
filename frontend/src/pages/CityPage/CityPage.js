import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCity, getAllCities } from '../../store';
import { City } from '../../components';

import css from './CityPage.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { createCategoryValidator, createCityValidator } from '../../validator';

const CityPage = () => {

    const dispatch = useDispatch();

    const {
        cities,
        serverErrors
    } = useSelector(state => state['cityReducer']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm({
        resolver: joiResolver(createCityValidator),
        mode: 'onTouched',
    });

    useEffect(() => {
        dispatch(getAllCities());
    }, []);

    const submit = (data) => {
        dispatch(createCity({ cityData: data }));
        reset();
    };

    return (
        <div className={css.content}>
            <div className={css.city_form_container}>
                {serverErrors ? <div className={css.server_error_block}>{serverErrors}</div> : <></>}
                <form onSubmit={handleSubmit(submit)} className={css.city_form}>
                    <div><input type="text" {...register('cityName')} placeholder={'cityName...'}/></div>
                    <div className={css.errors_span}>{errors.cityName && <span>{errors.cityName.message}</span>}</div>
                    <div><input className={css.city_create_update_button} type="submit" value={'Create'}/></div>
                </form>
            </div>
            <div className={css.city_container}>
                {
                    cities.map(city => <City key={city.id} city={city}/>)
                }
            </div>
        </div>
    );
};

export { CityPage };
