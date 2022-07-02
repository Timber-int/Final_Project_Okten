import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductIngredients } from '../ProductIngredients/ProductIngredients';
import { SelectedProductIngredients } from '../SelectedProductIngredients/SelectedProductIngredients';
import { ProductImageCarousel } from '../ProductImageCarousel/ProductImageCarousel';
import { OrderComponentButton } from '../OrderComponentButton/OrderComponentButton';
import { getAllProductIngredients, getProductInformationById, orderAction } from '../../store';
import css from './ProductDetails.module.css';

const ProductDetails = () => {

    const [carouselArray, setCarouselArray] = useState([]);

    const [product, setProduct] = useState([]);

    const { state: singleProduct } = useLocation();

    const dispatch = useDispatch();

    const {
        productDetails,
        products,
    } = useSelector(state => state['productReducer']);

    const { selectedProductIngredientsTotalCount } = useSelector(state => state['productIngredientReducer']);

    const { productIngredients } = useSelector(state => state['productIngredientReducer']);

    const {
        id,
        productPhoto,
        productBigPhoto,
        productName,
        description,
        productWeight,
        totalCount,
        productPrice,
    } = singleProduct;

    useEffect(() => {
        dispatch(getProductInformationById({ id }));
        dispatch(getAllProductIngredients());
        setCarouselArray([productPhoto, productBigPhoto]);
        setProduct(products.find(product => product.id === id));
    }, [id, products]);

    const moveToIngredients = () => {
        window.scroll(0, 800);
    };

    const createOrder = (productPrice, product, id) => {
        dispatch(orderAction.setTotalOrderCount({
            productData: {
                productPrice,
                product,
                id,
            }
        }));
    };

    return (
        <div className={css.product_details_container}>
            <div className={css.details_container}>
                <div className={css.product_details_photo_container}>
                    <ProductImageCarousel carouselArray={carouselArray}/>
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
                                    <span className={css.add_ingredient_button}>+</span>
                                    <span>Додати складники</span>
                                </div>
                                <div>
                                    Додатки: <span className={css.total_adds_count}>{selectedProductIngredientsTotalCount}</span> грн
                                </div>
                            </div>
                            <div>
                                <div className={css.counter_box}>
                                    <span>Кількість:</span>
                                    <span className={css.counter}>
                                        <OrderComponentButton totalCount={product ? product.totalCount : totalCount} id={id}/>
                                    </span>
                                </div>
                                <div className={css.price_box}>
                                    <span>Всього:</span>
                                    <span className={css.price}>{product ? product.productPrice : productPrice}</span>
                                    <span>грн</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SelectedProductIngredients/>
                        </div>
                        <div className={css.order_button_container}>
                            <button className={css.order_button}
                                    onClick={() => createOrder(product ? product.productPrice : productPrice, singleProduct, id)}>Додати у кошик
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.product_ingredients_container}>
                <div className={css.product_ingredients_text}>Додатки до піци</div>
                <ProductIngredients productIngredients={productIngredients}/>
            </div>
        </div>
    );
};

export { ProductDetails };
