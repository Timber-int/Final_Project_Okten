import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Footer } from '../Footer/Footer';
import { baseURL } from '../../config';
import { CONSTANTS, TokenType } from '../../constants';
import { cityActions, getAllCategories, getAllTotalOrderCount } from '../../store';
import css from './Layout.module.css';

const Layout = () => {

    const city = localStorage.getItem('city');

    const dispatch = useDispatch();

    const {
        totalOrderCount,
    } = useSelector(state => state['totalOrderCountReducer']);

    const {
        user: userRegistered,
    } = useSelector(state => state['authReducer']);

    const {
        status,
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
        dispatch(getAllTotalOrderCount());
    }, [totalOrderCount, chosenCity, city]);

    return (
        <div>
            {!city || cityStatus === true ? <ModalWindow/> : <></>}
            <div className={css.loading}>
                {status === CONSTANTS.LOADING
                    &&
                    <div className={css.line_box}>
                        <div className={css.line}/>
                    </div>
                }
            </div>
            <div className={css.header}>
                <NavLink className={css.home_page} to={'/'}>
                    <img className={css.logo_image} src="https://la.ua/wp-content/themes/lapiec/assets/frontend/img/logo-dark.svg" alt="logo"/>
                </NavLink>
                <NavLink to={'/action'} className={css.category_path}>
                        <span><img className={css.category_image} src={'https://la.ua/wp-content/uploads/2021/06/menu-icon-1.svg'}
                                   alt={'action'}/></span>
                    <span>Special offers</span>
                </NavLink>
                {
                    categories.map(category =>
                        <NavLink key={category.id} to={'/'} state={category} className={css.category_path}>
                            <span><img className={css.category_image} src={baseURL + '/' + category.logo} alt={category.name}/></span>
                            <span>{category.name}</span>
                        </NavLink>)
                }
                <div className={css.information_menu}>
                    <div className={css.information_path}>
                        <span>
                            <img
                                className={css.category_image}
                                src={'https://la.ua/ivano-frankivsk/wp-content/uploads/sites/4/2021/06/menu-icon-5.svg'}
                                alt={'action'}
                            />
                        </span>
                        <span>Information</span>
                    </div>
                    <div className={css.information_drop_down_menu}>
                        <NavLink className={css.information_drop_down_path} to={'/aboutUs'}>About us</NavLink>
                        <NavLink className={css.information_drop_down_path} to={'/offer'}>Offer</NavLink>
                        <NavLink className={css.information_drop_down_path} to={'/forPartners'}>For partners</NavLink>
                        <NavLink className={css.information_drop_down_path} to={'/contacts'}>Contacts</NavLink>
                        <NavLink className={css.information_drop_down_path} to={'/payment'}>Payment</NavLink>
                    </div>
                </div>
                <div className={css.city_box} onClick={() => dispatch(cityActions.setCityStatusTrue())}>
                    <div>
                        <img className={css.image_city_location}
                             src="https://la.ua/drogobych/wp-content/themes/lapiec/assets/frontend/img/header_location.svg" alt="centerCity"/>
                    </div>
                    <div className={css.city_name}>{city ? city : chosenCity}</div>
                </div>
                {
                    localStorage.getItem(TokenType.ACCESS) && localStorage.getItem(TokenType.REFRESH)
                        ?
                        <NavLink to={'/customerPanel'}>
                            <div
                                className={css.customer_data_box}>{userRegistered?.firstName[0].toUpperCase()}{userRegistered?.lastName[0].toUpperCase()}
                            </div>
                        </NavLink>
                        :
                        <NavLink to={'/registration'}>Sign in</NavLink>
                }
                <NavLink to={'/OrderPage'} className={css.order_total_count}>
                    <div className={css.order_content}>
                        <div>
                            <img className={css.basket_image}
                                 src={'https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/shopping-cart.svg'} alt="basket"/>
                        </div>
                        <div>
                            <span className={css.total_count}>
                                {totalOrderCount}
                            </span>
                            <span>UAH</span>
                        </div>
                    </div>
                </NavLink>
                {/* <NavLink to={'/adminPage'}>AdminPage</NavLink> */}
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
            <div className={css.footer}>
                <Footer/>
            </div>
        </div>
    );
};

export { Layout };
