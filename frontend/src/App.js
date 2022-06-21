import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { DeliveryHardPage, ProductDetailsPage, ProductPage, RegistrationPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index path={'products'} element={<ProductPage/>}/>
                <Route path={':id'} element={<ProductDetailsPage/>}/>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'deliveryHardPage/:id'} element={<DeliveryHardPage/>}/>
            </Route>
        </Routes>
    );
};

export { App };
