import React, { useEffect } from 'react';
import { ProductIngredientAdminContent } from '../../components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductIngredient, getAllProductIngredients, updateProductIngredientById } from '../../store';
import css from './ProductIngredientsComponentDetailsPage.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { createProductIngredientValidator } from '../../validator';
import { FaFileUpload } from 'react-icons/fa';

const ProductIngredientsComponentDetailsPage = () => {

    const { state: category } = useLocation();

    const dispatch = useDispatch();

    const {
        productIngredients,
        serverErrors,
        productIngredientDataToUpdate
    } = useSelector(state => state['productReducer']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm(
        {
            resolver: joiResolver(createProductIngredientValidator),
            mode: 'onTouched',
        }
    );

    useEffect(() => {
        dispatch(getAllProductIngredients());
        if (productIngredientDataToUpdate) {
            setValue('productWeight', productIngredientDataToUpdate.productWeight);
            setValue('productPrice', productIngredientDataToUpdate.productPrice);
            setValue('productIngredientName', productIngredientDataToUpdate.productIngredientName);
            setValue('productPhoto', productIngredientDataToUpdate.productPhoto);
        }
    }, [productIngredientDataToUpdate]);

    const submit = (data) => {
        if (productIngredientDataToUpdate) {
            dispatch(updateProductIngredientById({
                productIngredientDataToUpdate: {
                    ...data,
                    id: productIngredientDataToUpdate.id,
                    productWeight: getValues('productWeight'),
                    productPrice: getValues('productPrice'),
                    productIngredientName: getValues('productIngredientName'),
                    productPhoto: getValues('productPhoto'),
                    categoryId: productIngredientDataToUpdate.categoryId,
                    productIngredientUniqueName: productIngredientDataToUpdate.productIngredientName,
                }
            }));
            reset();
        } else {
            dispatch(createProductIngredient({
                productIngredient: {
                    ...data,
                    categoryId: category.id
                }
            }));
            reset();
        }
    };

    return (
        <div className={css.product_ingredients_content}>
            <div className={css.form_box}>
                {serverErrors ? <div className={css.server_error_block}>{serverErrors}</div> : <></>}
                <form key={category.id} onSubmit={handleSubmit(submit)} className={css.product_form}>
                    <div>
                        <input className={css.file_input} id="uploadBtn" type="file" {...register('productPhoto')} placeholder={'productPhoto...'}/>
                        <label className={css.file_label} htmlFor="uploadBtn">
                            <FaFileUpload/>
                            Upload photo
                        </label>
                    </div>
                    <div className={css.errors_span}>{errors.productPhoto && <span>{errors.productPhoto.message}</span>}</div>
                    <div><input type="text" {...register('productIngredientName')} placeholder={'productIngredientName...'}/></div>
                    <div className={css.errors_span}>{errors.productIngredientName && <span>{errors.productIngredientName.message}</span>}</div>
                    <div><input type="number" {...register('productPrice')} placeholder={'productPrice...'}/></div>
                    <div className={css.errors_span}>{errors.productPrice && <span>{errors.productPrice.message}</span>}</div>
                    <div><input type="number" {...register('productWeight')} placeholder={'productWeight...'}/></div>
                    <div className={css.errors_span}>{errors.productWeight && <span>{errors.productWeight.message}</span>}</div>
                    <div>
                        <input type="submit" className={css.product_create_update_button}
                               value={productIngredientDataToUpdate ? 'Update' : 'Create'}/>
                    </div>
                </form>
            </div>
            <div className={css.products_ingredients_box}>
                {
                    [...productIngredients].filter(productIngredient => productIngredient.categoryId === category.id)
                        .map(productIngredient => <ProductIngredientAdminContent key={productIngredient.id} productIngredient={productIngredient}
                        />)
                }
            </div>
        </div>
    );
};

export { ProductIngredientsComponentDetailsPage };
