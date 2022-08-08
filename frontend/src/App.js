import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components';

import {
    ActionPage,
    AdminPage,
    CategoryPage,
    CityPage,
    DeliveryHardPage,
    NotFoundPage,
    OrderPage,
    ProductDetailsPage,
    ProductIngredientsComponentDetailsPage,
    ProductIngredientsPage,
    ProductPage,
    RegistrationPage,
    CityAddressDetailsComponentPage,
    CityAddressPage,
    ProductInformationPage,
    ProductInformationDetailsComponentPage,
    AboutUsPage,
    OfferPage, ForPartnersPage, ContactsPage, PaymentPage
} from './pages';
import { getAllCities } from './store';
import { useDispatch } from 'react-redux';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ProductsComponentDetailsPage } from './pages/ProductsComponentDetailsPage/ProductsComponentDetailsPage';

const App = () => {

    const dispatch = useDispatch();

    const path = useLocation();

    useEffect(() => {
        dispatch(getAllCities());
    }, [path]);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<ProductPage/>}/>
                <Route path={'productId/:id'} element={<ProductDetailsPage/>}/>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'deliveryHardPage/:id'} element={<DeliveryHardPage/>}/>
                <Route path={'orderPage'} element={<OrderPage/>}/>
                <Route path={'action'} element={<ActionPage/>}/>
                <Route path={'aboutUs'} element={<AboutUsPage/>}/>
                <Route path={'offer'} element={<OfferPage/>}/>
                <Route path={'forPartners'} element={<ForPartnersPage/>}/>
                <Route path={'contacts'} element={<ContactsPage/>}/>
                <Route path={'payment'} element={<PaymentPage/>}/>
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
