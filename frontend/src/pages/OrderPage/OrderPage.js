import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OrderPage = () => {

    const [products, setProducts] = useState([]);
    console.log(products);
    const {
        chosenProduct,
        chosenProductIdArray
    } = useSelector(state => state['orderReducer']);

    useEffect(() => {

        chosenProductIdArray.forEach(element => {
            const product= chosenProduct[element];
        });
    }, [chosenProduct]);
    return (
        <div>

        </div>
    );
};

export { OrderPage };
