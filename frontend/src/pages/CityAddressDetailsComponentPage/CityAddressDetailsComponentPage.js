import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCityAddress, getAllCityAddress } from '../../store/cityAddressSlice';
import { CityAddress } from '../../components';
import css from './CityAddressDetailsComponentPage.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { createCityAddressValidator } from '../../validator';

const CityAddressDetailsComponentPage = () => {

    const { state: city } = useLocation();

    const dispatch = useDispatch();

    const {
        cityAddress,
        serverErrors
    } = useSelector(state => state['cityAddressReducer']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm(
        {
            resolver: joiResolver(createCityAddressValidator),
            mode: 'onTouched',
        }
    );

    useEffect(() => {
        dispatch(getAllCityAddress());
    }, []);

    const submit = (data) => {
        dispatch(createCityAddress({
            cityAddressData: {
                ...data,
                cityId: city.id
            }
        }));
        reset();
    };

    return (
        <div className={css.city_address_content}>
            <div className={css.form_box}>
                {serverErrors ? <div className={css.server_error_block}>{serverErrors}</div> : <></>}
                <form onSubmit={handleSubmit(submit)} className={css.city_address_form}>
                    <div><input type="text" {...register('addressName')} placeholder={'addressName...'}/></div>
                    <div className={css.errors_span}>{errors.addressName && <span>{errors.addressName.message}</span>}</div>
                    <div><input className={css.city_address_create_update_button} type="submit" value={'Create'}/></div>
                </form>
            </div>
            <div className={css.city_address_box}>
                {
                    [...cityAddress].filter(address => address.cityId === city.id)
                        .map(address => <CityAddress key={address.id} address={address}/>)
                }
            </div>
        </div>
    );
};

export { CityAddressDetailsComponentPage };
