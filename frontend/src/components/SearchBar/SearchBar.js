import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

import css from './SearchBar.module.css';
import { NavLink } from 'react-router-dom';

const SearchBar = ({
    category,
    products
}) => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState('');

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = products.filter(product => {
            return product.productName.toLowerCase()
                .includes(searchWord.toLowerCase());
        });
        if (searchWord === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered('');
    };

    return (
        <div className={css.search}>
            <label className={css.search_input_box}>
                <input className={css.search_input} type="text" value={wordEntered}
                       placeholder={`Search ${category ? category.name.toLowerCase() : ''}...`}
                       onChange={handleFilter}/>
                <div className={css.search_input_icon}>
                    {
                        filteredData.length === 0
                            ?
                            (
                                <BiSearchAlt2 className={css.icon}/>

                            )
                            :
                            (
                                <MdDelete onClick={clearInput} className={css.icon}/>
                            )
                    }
                </div>
            </label>
            {
                filteredData.length !== 0
                &&
                <div className={css.product_results}>
                    {filteredData && [...filteredData].filter(product => product.categoryId === category?.id)
                        .map((product, index) => {
                            return <NavLink
                                to={'/productId/' + product.id}
                                state={product}
                                className={css.product_element}
                                key={product.id}>
                                <p className={css.product_element_box}>
                                    <span>{product.productName}</span>
                                    <span className={css.product_price}>
                                        <p className={css.product_price_box}>{product.productPrice}</p>
                                        <p>UAH</p>
                                    </span>
                                </p>
                            </NavLink>;
                        })}
                </div>
            }
        </div>
    );
};

export { SearchBar };
