import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components';

import {
    ActionPage,
    AdminPage,
    CategoryPage,
    DeliveryHardPage,
    NotFoundPage,
    OrderPage,
    ProductDetailsPage,
    ProductPage,
    RegistrationPage
} from './pages';
import { getAllCities } from './store';
import { useDispatch } from 'react-redux';

const App = () => {

    const dispatch = useDispatch();

    const path = useLocation();

    useEffect(() => {
        dispatch(getAllCities());
    }, [path]);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'categoryId/:id'} element={<ProductPage/>}/>
                <Route path={'productId/:id'} element={<ProductDetailsPage/>}/>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'deliveryHardPage/:id'} element={<DeliveryHardPage/>}/>
                <Route path={'orderPage'} element={<OrderPage/>}/>
                <Route path={'action'} element={<ActionPage/>}/>
            </Route>
            <Route path={'/adminPage'} element={<AdminPage/>}>
                <Route path={'category'} element={<CategoryPage/>}/>
            </Route>
            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export { App };
