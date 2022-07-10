import React from 'react';

import { baseURL } from '../../config';
import css from './Category.module.css';
import { useDispatch } from 'react-redux';
import { categoryAction, deleteCategoryById } from '../../store';

const Category = ({ category }) => {

    const dispatch = useDispatch();

    const {
        logo,
        createdAt,
        name,
        id
    } = category;

    const deleteCategory = (id) => {
        dispatch(deleteCategoryById({ id }));
    };

    const updateCategoryGetData = (category) => {
        dispatch(categoryAction.updateCategoryGetData({ category }));
    };

    return (
        <div className={css.category_box}>
            <div><img className={css.category_image} src={baseURL + '/' + logo} alt={name}/></div>
            <div className={css.category_name}>{name}</div>
            <div>CreatedAt: {createdAt}</div>
            <div>
                <button onClick={() => deleteCategory(id)}>Delete</button>
            </div>
            <div>
                <button onClick={() => updateCategoryGetData(category)}>Update</button>
            </div>
        </div>
    );
};

export { Category };
