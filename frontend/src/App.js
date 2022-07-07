import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { ActionPage, DeliveryHardPage, OrderPage, ProductDetailsPage, ProductPage, RegistrationPage } from './pages';

const App = () => {

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
        </Routes>
    );
};

export { App };
