import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ModalWindow } from '../ModalWindow/ModalWindow';
import css from './Layout.module.css';
import { cityActions, getAllCategories } from '../../store';
import { baseURL } from '../../config';

const Layout = () => {

    const city = localStorage.getItem('city');

    const dispatch = useDispatch();

    const {
        totalOrderCount,
        usedOrderType,
    } = useSelector(state => state['orderReducer']);

    const {
        chosenCity,
        cityStatus
    } = useSelector(state => state['cityReducer']);

    const {
        categories,
    } = useSelector(state => state['categoryReducer']);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [totalOrderCount, usedOrderType, chosenCity,city]);

    return (
        <div>
            {!city || cityStatus === true ? <ModalWindow/> : <></>}
            <div className={css.header}>
            <NavLink to={'/action'} className={css.category_path}>
                <span><img className={css.category_image} src={'https://la.ua/wp-content/uploads/2021/06/menu-icon-1.svg'} alt={'action'}/></span>
                <span>Акції</span>
            </NavLink>
                {
                    categories.map(category =>
                        <NavLink key={category.id} to={'/categoryId/' + category.id} state={category} className={css.category_path}>
                            <span><img className={css.category_image} src={baseURL + '/' + category.logo} alt={category.name}/></span>
                            <span>{category.name}</span>
                        </NavLink>)
                }
                <div className={css.city_box} onClick={() => dispatch(cityActions.setCityStatusTrue())}>
                    <div>
                        <img className={css.image_city_location}
                             src="https://la.ua/drogobych/wp-content/themes/lapiec/assets/frontend/img/header_location.svg" alt="centerCity"/>
                    </div>
                    <div className={css.city_name}>{city ? city : chosenCity}</div>
                </div>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/OrderPage'}>
                    <div className={css.order_content}>
                        <div>
                            <img className={css.basket_image}
                                 src={'https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/shopping-cart.svg'} alt="basket"/>
                        </div>
                        <div>
                            <span className={css.total_count}>
                                {
                                    usedOrderType === 'selfPickup'
                                        ? Math.trunc(totalOrderCount - totalOrderCount * 15 / 100)
                                        : totalOrderCount
                                }
                            </span>
                            <span>грн</span>
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
            <div className={css.footer}>
                Hello it's Jonny!!!
            </div>
        </div>
    );
};

export { Layout };
