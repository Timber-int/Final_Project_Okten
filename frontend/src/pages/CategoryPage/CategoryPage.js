import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from '../../components';
import { createCategory, getAllCategories, updateCategoryById } from '../../store';
import css from './CategoryPage.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { createCategoryValidator } from '../../validator';

const CategoryPage = () => {
    const dispatch = useDispatch();

    const {
        categories,
        serverErrors,
        categoryDataToUpdate
    } = useSelector(state => state['categoryReducer']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm({
        resolver: joiResolver(createCategoryValidator),
        mode: 'onTouched',
    });

    useEffect(() => {
        dispatch(getAllCategories());
        if (categoryDataToUpdate) {
            setValue('name', categoryDataToUpdate.name);
            setValue('logo', categoryDataToUpdate.logo);
        }
    }, [categoryDataToUpdate]);

    const submit = (data) => {
        if (categoryDataToUpdate) {
            dispatch(updateCategoryById({
                categoryDataToUpdate: {
                    ...categoryDataToUpdate,
                    name: getValues('name'),
                    logo: getValues('logo'),
                    uniqueName: categoryDataToUpdate.name,
                }
            }));
            reset();
        } else {
            dispatch(createCategory({ category: data }));
            reset();
        }
    };

    return (
        <div className={css.category_container}>
            <div className={css.category_form_container}>
                {serverErrors ? <div className={css.server_error_block}>{serverErrors}</div> : <></>}
                <form onSubmit={handleSubmit(submit)} className={css.category_form}>
                    <div><input type="file" {...register('logo')} placeholder={'logo...'}/></div>
                    <div className={css.errors_span}>{errors.logo && <span>{errors.logo.message}</span>}</div>
                    <div><input type="text" {...register('name')} placeholder={'name...'}/></div>
                    <div className={css.errors_span}>{errors.name && <span>{errors.name.message}</span>}</div>
                    <div><input className={css.category_create_update_button} type="submit" value={categoryDataToUpdate ? 'Update' : 'create'}/></div>
                </form>
            </div>
            <div className={css.category_container_block}>
                {
                    categories.map(category => <Category key={category.id} category={category}/>)
                }
            </div>
        </div>
    );
};

export { CategoryPage };