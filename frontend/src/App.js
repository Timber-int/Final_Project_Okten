import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { ProductDetailsPage, ProductPage, RegistrationPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index path={'products'} element={<ProductPage/>}/>
                <Route path={':id'} element={<ProductDetailsPage/>}/>
                <Route path={'registration'} element={<RegistrationPage/>}/>
            </Route>
        </Routes>
    );
};

export { App };
