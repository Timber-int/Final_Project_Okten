import React, { useEffect, useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import css from './UserChosenAddress.module.css';

const UserChosenAddress = () => {

    const dispatch = useDispatch();

    const city = localStorage.getItem('city');

    const { cities } = useSelector(state => state['cityReducer']);

    const { cityAddress } = useSelector(state => state['cityAddressReducer']);

    return (
        <div>
            <div>{city}</div>
            {/* <div> */}
            {/*     { */}
            {/*         [...cityAddress].filter(address => address.cityId === city.id) */}
            {/*             .map(address => ( */}
            {/*                 <div> */}
            {/*                     <div>{address.addressName}</div> */}
            {/*                 </div> */}
            {/*             )) */}
            {/*     } */}
            {/* </div> */}
        </div>
    );
};

export { UserChosenAddress };
