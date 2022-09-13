import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store';

const CustomerPage = () => {

    const dispatch = useDispatch();



    return (
        <div style={{ marginTop: '20vh' }}>

            <button onClick={() => dispatch(logout())}>sdasd</button>
        </div>
    );
};

export { CustomerPage };
