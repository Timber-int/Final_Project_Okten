import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store';
import { customerOrderAction } from '../../store/customerOrderSlice';

const CustomerPage = () => {

    const dispatch = useDispatch();

    const logoutFormCustomerPage = () => {
        dispatch(logout());
        dispatch(customerOrderAction.deleteUserData());
    };
    return (
        <div style={{ marginTop: '20vh' }}>

            <button onClick={() => logoutFormCustomerPage()}>Logout</button>
        </div>
    );
};

export { CustomerPage };
