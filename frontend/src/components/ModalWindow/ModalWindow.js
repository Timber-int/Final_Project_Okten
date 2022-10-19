import React, { useState } from 'react';
import ReactSelect from 'react-select';
import { Controller, useForm, } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { cityActions } from '../../store';
import css from './ModalWindow.module.css';

const ModalWindow = () => {

    const city = localStorage.getItem('city');

    const [visible, setVisible] = useState(true);

    const dispatch = useDispatch();

    const { cities } = useSelector(state => state['cityReducer']);

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const choseShopCity = (data) => {
        dispatch(cityActions.setChosenCity({ data }));
        setVisible(false);
    };

    const getValue = (value) => {
        return value ? cities.find((city) => city.value === value) : '';
    };

    const rootClasses = [css.modalWindow];

    if (visible) {
        rootClasses.push(css.active);
    }
    const exit = () => {
        dispatch(cityActions.setCityStatusFalse());
        setVisible(false);
    };

    return (
        <div className={rootClasses.join(' ')}>
            <div className={css.modalWindowContent} onClick={event => event.stopPropagation()}>
                {city ? <div className={css.exit_box} onClick={() => exit()}><span>✖</span></div> : <></>}
                <div className={css.city_image_container}>
                    <div className={css.chose_city_image_box}>
                        <img className={css.city_image} src="https://la.ua/drogobych/wp-content/themes/lapiec/assets/frontend/img/location_popup.svg"
                             alt="cityImage"/>
                    </div>
                    <div className={css.chose_city_text_box}>Choose the delivery method</div>
                </div>
                <form onSubmit={handleSubmit(choseShopCity)} className={css.chose_city_select}>
                    <Controller
                        control={control}
                        name={'city'}
                        rules={{
                            required: 'City is required'
                        }}
                        render={({
                            field: {
                                onChange,
                                value
                            },
                            fieldState: { error }
                        }) => (
                            <div className={css.selected_city_container}>
                                <ReactSelect
                                    placeholder={'Select a city...'}
                                    options={cities}
                                    value={getValue(value)}
                                    onChange={(newValue) => onChange(newValue.cityName)}
                                />
                                {
                                    error &&
                                    <div className={css.errors_span}>
                                        <span>{errors.city.message}</span>
                                    </div>
                                }
                            </div>
                        )}
                    />
                    <div className={css.create_user_order_data_container}>
                        <input type="submit" value={'Confirm'} className={css.create_user_order_button}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { ModalWindow };
