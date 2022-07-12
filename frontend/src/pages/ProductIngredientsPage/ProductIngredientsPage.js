import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../store';
import { NavLink, Outlet } from 'react-router-dom';
import css from '../ProductsPage/ProductsPage.module.css';

const ProductIngredientsPage = () => {

    const dispatch = useDispatch();

    const {
        categories,
    } = useSelector(state => state['categoryReducer']);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategories());
        }
    }, [categories]);

    return (
        <div className={css.products_container}>
            {
                categories.map(category => (
                    <div key={category.id} className={css.product_data_box}>
                        <NavLink to={'/adminPage/productIngredients/productIngredientsDetails/' + category.id} state={category}
                                 className={css.category_name}>{category.name}
                        </NavLink>
                    </div>
                ))
            }
            <div className={css.content_container}>
                <Outlet/>
            </div>
        </div>
    );
};

export { ProductIngredientsPage };
