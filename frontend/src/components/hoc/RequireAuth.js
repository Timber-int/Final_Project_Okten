import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CONSTANTS, TokenType } from '../../constants';

const RequireAuth = ({ children }) => {
    const location = useLocation();

    const {
        user,
    } = useSelector(state => state['authReducer']);

    if (!user && !localStorage.getItem(TokenType.ACCESS) && !localStorage.getItem(TokenType.REFRESH)) {
        return <Navigate to={'/login'} state={location}/>;
    }

    if (user.role === CONSTANTS.ADMIN){
        return <Navigate to={'/adminPage'} state={location}/>;
    }
    return children;
};

export { RequireAuth };
