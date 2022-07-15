import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ProductInformationAdminContent } from '../../components';
import { createProductInformation, getAllProductsInformation, updateProductsInformationById } from '../../store';

import css from './ProductInformationDetailsComponentPage.module.css';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { createProductInformationValidator } from '../../validator';

const ProductInformationDetailsComponentPage = () => {
    const { state: product } = useLocation();

    const dispatch = useDispatch();

    const {
        productInformation,
        serverErrors,
        productInformationDataToUpdate,
    } = useSelector(state => state['productInformationReducer']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm(
        {
            resolver: joiResolver(createProductInformationValidator),
            mode: 'onTouched',
        }
    );

    useEffect(() => {
        dispatch(getAllProductsInformation());
        if (productInformationDataToUpdate) {
            setValue('productCalories', productInformationDataToUpdate.productCalories);
            setValue('productCarbohydrates', productInformationDataToUpdate.productCarbohydrates);
            setValue('productFats', productInformationDataToUpdate.productFats);
            setValue('productProteins', productInformationDataToUpdate.productProteins);
        }
    }, [productInformationDataToUpdate]);

    const submit = (data) => {
        if (productInformationDataToUpdate) {
            dispatch(updateProductsInformationById({
                productInformationDataToUpdate: {
                    ...productInformationDataToUpdate,
                    productCalories: getValues('productCalories'),
                    productCarbohydrates: getValues('productCarbohydrates'),
                    productFats: getValues('productFats'),
                    productProteins: getValues('productProteins'),
                }
            }));
        } else {
            dispatch(createProductInformation({
                productInformation: {
                    ...data,
                    productId: product.id,
                }
            }));
            reset();
        }
    };

    return (
        <div className={css.product_address_content}>
            <div className={css.form_box}>
                {serverErrors ? <div className={css.server_error_block}>{serverErrors}</div> : <></>}
                <form onSubmit={handleSubmit(submit)} className={css.product_information_form}>
                    <div><input type="number" {...register('productCalories')} placeholder={'productCalories...'}/></div>
                    <div className={css.errors_span}>{errors.productCalories && <span>{errors.productCalories.message}</span>}</div>
                    <div><input type="number" {...register('productCarbohydrates')} placeholder={'productCarbohydrates...'}/></div>
                    <div className={css.errors_span}>{errors.productCarbohydrates && <span>{errors.productCarbohydrates.message}</span>}</div>
                    <div><input type="number" {...register('productFats')} placeholder={'productFats...'}/></div>
                    <div className={css.errors_span}>{errors.productFats && <span>{errors.productFats.message}</span>}</div>
                    <div><input type="number" {...register('productProteins')} placeholder={'productProteins...'}/></div>
                    <div className={css.errors_span}>{errors.productProteins && <span>{errors.productProteins.message}</span>}</div>
                    <div><input className={css.product_information_create_update_button} type="submit"
                                value={productInformationDataToUpdate ? 'Update' : 'Create'}/></div>
                </form>
            </div>
            <div className={css.products_ingredients_box}>
                {
                    [...productInformation].filter(productInformation => productInformation.productId === product.id)
                        .map(productInformation =>
                            <ProductInformationAdminContent
                                key={productInformation.id}
                                productInformation={productInformation}
                            />
                        )
                }
            </div>
        </div>
    );
};

export { ProductInformationDetailsComponentPage };
