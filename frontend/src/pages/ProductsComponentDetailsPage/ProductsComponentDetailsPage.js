import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';

import { ProductAdminContent } from '../../components';
import { createProduct, getAllProducts, productAction, updateProductById } from '../../store';
import { createProductValidator } from '../../validator';
import css from './ProductsComponentDetailsPage.module.css';
import { FaFileUpload } from 'react-icons/fa';

const ProductsComponentDetailsPage = () => {

    const { state: category } = useLocation();

    const dispatch = useDispatch();

    const {
        products,
        serverErrors,
        productDataToUpdate
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
            resolver: joiResolver(createProductValidator),
            mode: 'onTouched',
        }
    );

    useEffect(() => {
        dispatch(getAllProducts());
        if (productDataToUpdate) {
            setValue('productWeight', productDataToUpdate.productWeight);
            setValue('productPrice', productDataToUpdate.productPrice);
            setValue('description', productDataToUpdate.description);
            setValue('productName', productDataToUpdate.productName);
            setValue('productPhoto', productDataToUpdate.productPhoto);
            setValue('productBigPhoto', productDataToUpdate.productBigPhoto);
        }
    }, [productDataToUpdate]);

    const submit = (data) => {
        if (productDataToUpdate) {
            dispatch(updateProductById({
                productDataToUpdate: {
                    ...data,
                    id: productDataToUpdate.id,
                    productWeight: getValues('productWeight'),
                    productPrice: getValues('productPrice'),
                    description: getValues('description'),
                    productName: getValues('productName'),
                    productPhoto: getValues('productPhoto'),
                    productBigPhoto: getValues('productBigPhoto'),
                    categoryId: productDataToUpdate.categoryId,
                    uniqueProductName: productDataToUpdate.productName,
                }
            }));
            reset();
        } else {
            dispatch(createProduct({
                productData: {
                    ...data,
                    categoryId: category.id,
                }
            }));
            reset();
        }
    };

    const clear = () => {
        dispatch(productAction.setProductDataToUpdateDefault());
        reset();
    }

    return (
        <div className={css.products_container}>
            <div className={css.form_box}>
                {serverErrors ? <div className={css.server_error_block}>{serverErrors}</div> : <></>}
                <form key={category.id} onSubmit={handleSubmit(submit)} className={css.product_form}>
                    <div>
                        <input className={css.file_input} type="file" {...register('productPhoto')} placeholder={'productPhoto...'} id="uploadBtnFirst"/>
                        <label className={css.file_label} htmlFor="uploadBtnFirst">
                            <FaFileUpload/>
                            Upload photo
                        </label>
                    </div>
                    <div className={css.errors_span}>{errors.productPhoto && <span>{errors.productPhoto.message}</span>}</div>
                    <div>
                        <input className={css.file_input} type="file" {...register('productBigPhoto')} placeholder={'productBigPhoto...'} id="uploadBtnSecond"/>
                        <label className={css.file_label} htmlFor="uploadBtnSecond">
                            <FaFileUpload/>
                            Upload photo
                        </label>
                    </div>
                    <div className={css.errors_span}>{errors.productBigPhoto && <span>{errors.productBigPhoto.message}</span>}</div>
                    <div><input type="text" {...register('productName')} placeholder={'productName...'}/></div>
                    <div className={css.errors_span}>{errors.productName && <span>{errors.productName.message}</span>}</div>
                    <div><input type="text" {...register('description')} placeholder={'description...'}/></div>
                    <div className={css.errors_span}>{errors.description && <span>{errors.description.message}</span>}</div>
                    <div><input type="number" {...register('productPrice')} placeholder={'productPrice...'}/></div>
                    <div className={css.errors_span}>{errors.productPrice && <span>{errors.productPrice.message}</span>}</div>
                    <div><input type="number" {...register('productWeight')} placeholder={'productWeight...'}/></div>
                    <div className={css.errors_span}>{errors.productWeight && <span>{errors.productWeight.message}</span>}</div>
                    <div>
                        <input type="submit" className={css.product_create_update_button} value={productDataToUpdate ? 'Update' : 'Create'}/>
                    </div>
                </form>
                {
                    productDataToUpdate
                        ?
                        <button className={css.clear_button} onClick={() => clear()}>Clear</button>
                        :
                        <></>
                }
            </div>
            <div className={css.product_box}>
                {
                    [...products].filter(product => product.categoryId === category.id)
                        .map(product => <ProductAdminContent key={product.id} product={product}
                        />)
                }
            </div>
        </div>
    );
};

export { ProductsComponentDetailsPage };
