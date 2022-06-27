import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductIngredients } from '../ProductIngredients/ProductIngredients';
import { getAllProductIngredients, getProductInformationById } from '../../store';
import { baseURL } from '../../config';
import css from './ProductDetails.module.css';
import { SelectedProductIngredients } from '../SelectedProductIngredients/SelectedProductIngredients';

const ProductDetails = () => {

    const { state } = useLocation();

    const dispatch = useDispatch();

    const { productDetails } = useSelector(state => state['productReducer']);

    const { selectedProductIngredientsTotalCount } = useSelector(state => state['productIngredientReducer']);

    const { productIngredients } = useSelector(state => state['productIngredientReducer']);

    const {
        id,
        productPhoto,
        productName,
        description,
        productWeight,
        totalCount,
        productPrice,
    } = state;

    useEffect(() => {
        dispatch(getProductInformationById({ id }));
        dispatch(getAllProductIngredients());
    }, [id, productPrice]);

    const moveToIngredients = () => {
        window.scroll(0, 1000);
    };

    return (
        <div className={css.product_details_container}>
            <div className={css.details_container}>
                <div className={css.product_details_photo_container}>
                    <img className={css.product_photo} src={baseURL + '/' + productPhoto} alt={productName}/>
                </div>
                <div className={css.product_details_all_information}>
                    <div className={css.content}>
                        <div className={css.product_details_name}>{productName}</div>
                        <div className={css.product_details_description}>{description}</div>
                        {productDetails ?
                            <div className={css.product_details_more_information_container}>
                                <div className={css.small_information_box}>
                                    <span className={css.default_name}>Білки</span>
                                    <span className={css.info_content}>{productDetails.productProteins} г</span>
                                </div>
                                <div className={css.small_information_box}>
                                    <span className={css.default_name}>Вуглеводи</span>
                                    <span className={css.info_content}>{productDetails.productCarbohydrates} г</span>
                                </div>
                                <div className={css.small_information_box}>
                                    <span className={css.default_name}>Жири</span>
                                    <span className={css.info_content}>{productDetails.productFats} г</span>
                                </div>
                                <div className={css.small_information_box}>
                                    <span className={css.default_name}>Калорійність</span>
                                    <span className={css.info_content}>{productDetails.productCalories} ккал</span>
                                </div>
                            </div>
                            :
                            <></>
                        }
                        <div className={css.product_details_size_weight_container}>
                            <div>
                                <span className={css.first_default_element}>
                                    <img className={css.default_images}
                                         src="https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/size.svg"
                                         alt="size"/>
                                </span>
                                <span>Розмір: 30см</span>
                            </div>
                            <div>
                                <span className={css.first_default_element}>
                                    <img className={css.default_images}
                                         src="https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/weight.svg"
                                         alt="weight"/>
                                </span>
                                <span>Вага: {productWeight}г</span>
                            </div>
                        </div>
                        <div className={css.product_details_order_container}>
                            <div>
                                <div className={css.add_ingredients} onClick={() => moveToIngredients()}>
                                    <span className={css.add_ingredient_button} >+</span>
                                    <span>Додати складники</span>
                                </div>
                                <div>
                                    Додатки: <span className={css.total_adds_count}>{selectedProductIngredientsTotalCount}</span> грн
                                </div>
                            </div>
                            <div>
                                <div>3</div>
                                <div>4</div>
                            </div>
                        </div>
                        <SelectedProductIngredients/>
                        <div className={css.order_button_container}>
                            <button className={css.order_button}>Додати у кошик</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.product_ingredients_container}>
                <ProductIngredients productIngredients={productIngredients}/>
            </div>
        </div>
    );
};

export { ProductDetails };
