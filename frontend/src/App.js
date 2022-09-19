import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components';

import {
    AboutUsPage,
    ActionPage,
    AdminPage,
    CategoryPage,
    CityAddressDetailsComponentPage,
    CityAddressPage,
    CityPage,
    ContactsPage,
    CustomerPage,
    DeliveryHardPage,
    ForPartnersPage,
    LoginPage,
    NotFoundPage,
    OfferPage,
    OrderPage,
    PaymentPage,
    ProductDetailsPage,
    ProductInformationDetailsComponentPage,
    ProductInformationPage,
    ProductIngredientsComponentDetailsPage,
    ProductIngredientsPage,
    ProductPage,
    RegistrationPage
} from './pages';
import { checkAuth, getAllCities } from './store';
import { useDispatch } from 'react-redux';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ProductsComponentDetailsPage } from './pages/ProductsComponentDetailsPage/ProductsComponentDetailsPage';
import { TokenType } from './constants';
import { RequireAuth } from './components/hoc';

const App = () => {

    const dispatch = useDispatch();

    const path = useLocation();

    useEffect(() => {
        dispatch(getAllCities());
        // if (localStorage.getItem(TokenType.ACCESS) && localStorage.getItem(TokenType.REFRESH)) {
        //     dispatch(checkAuth());
        // }
    }, [path]);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<ProductPage/>}/>
                <Route path={'productId/:id'} element={<ProductDetailsPage/>}/>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'deliveryHardPage/:id'} element={<DeliveryHardPage/>}/>
                <Route path={'orderPage'} element={<OrderPage/>}/>
                <Route path={'action'} element={<ActionPage/>}/>
                <Route path={'aboutUs'} element={<AboutUsPage/>}/>
                <Route path={'offer'} element={<OfferPage/>}/>
                <Route path={'forPartners'} element={<ForPartnersPage/>}/>
                <Route path={'contacts'} element={<ContactsPage/>}/>
                <Route path={'payment'} element={<PaymentPage/>}/>
                <Route path={'customerPanel'} element={<RequireAuth><CustomerPage/></RequireAuth>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
            <Route path={'/adminPage'} element={<AdminPage/>}>
                <Route path={'category'} element={<CategoryPage/>}/>
                <Route path={'cities'} element={<CityPage/>}/>
                <Route path={'cityAddress'} element={<CityAddressPage/>}>
                    <Route path={'cityAddressDetails/:id'} element={<CityAddressDetailsComponentPage/>}/>
                </Route>
                <Route path={'productInformation'} element={<ProductInformationPage/>}>
                    <Route path={'productDetailInformation/:id'} element={<ProductInformationDetailsComponentPage/>}/>
                </Route>
                <Route path={'productIngredients'} element={<ProductIngredientsPage/>}>
                    <Route path={'productIngredientsDetails/:id'} element={<ProductIngredientsComponentDetailsPage/>}/>
                </Route>
                <Route path={'products'} element={<ProductsPage/>}>
                    <Route path={'productDetails/:id'} element={<ProductsComponentDetailsPage/>}/>
                </Route>
            </Route>
        </Routes>
    );
};

export { App };
