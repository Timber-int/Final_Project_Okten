import React from 'react';
import { useLocation } from 'react-router-dom';

const DeliveryHardPage = () => {

    const { state } = useLocation();

    const {
        text,
        pathUrl
    } = state;

    return (
        <div style={{
            marginTop: '15vh',
            font: '2vh'
        }}>
            {text}
        </div>
    );
};

export { DeliveryHardPage };
