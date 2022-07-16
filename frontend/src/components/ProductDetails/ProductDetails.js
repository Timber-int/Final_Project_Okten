import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductIngredients } from '../ProductIngredients/ProductIngredients';
import { SelectedProductIngredients } from '../SelectedProductIngredients/SelectedProductIngredients';
import { ProductImageCarousel } from '../ProductImageCarousel/ProductImageCarousel';
import { OrderComponentButton } from '../OrderComponentButton/OrderComponentButton';
import {
    getAllProductIngredients,
    getAllProductIngredientsData,
    getAllProducts,
    getCategoryById,
    getProductInformationById, getProductInformationByProductId,
    orderAction
} from '../../store';
import { baseURL } from '../../config';
import { DEFAULT_CATEGORY_NAME } from '../../constants';
import { ProductInformation } from '../ProductInformation/ProductInformation';
import css from './ProductDetails.module.css';

const ProductDetails = () => {

    const [carouselArray, setCarouselArray] = useState([]);

    const [product, setProduct] = useState(null);

    const { state: singleProduct } = useLocation();

    const dispatch = useDispatch();

    const {
        category,
    } = useSelector(state => state['categoryReducer']);

    const {
        singleProductInformation,
    } = useSelector(state => state['productInformationReducer']);

    const {
        products,
        selectedProductIngredientsTotalCount,
        productIngredients,
        selectedProductIngredientsId,
        selectedProductIngredients,
    } = useSelector(state => state['productReducer']);

    const {
        id,
        productPhoto,
        productBigPhoto,
        productName,
        description,
        productWeight,
        totalCount,
        productPrice,
        categoryId
    } = singleProduct;

    useEffect(() => {
        dispatch(getProductInformationByProductId({ productId: id }));
        if (productIngredients.length === 0) {
            dispatch(getAllProductIngredients());
        }
        setCarouselArray([productPhoto, productBigPhoto]);
        setProduct(products.find(product => product.id === id));
        if (!category) {
            dispatch(getCategoryById({ id: categoryId }));
        }
        if (products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [id, products, category, productIngredients]);

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
                    {
                        productBigPhoto
                            ?
                            <ProductImageCarousel carouselArray={carouselArray}/>
                            :
                            <div className={css.product_photo_container_static}><img src={baseURL + '/' + productPhoto} alt={productName}/></div>
                    }
                </div>

                <div className={css.product_details_all_information}>
                    <div className={css.content}>
                        <div className={css.product_details_name}>{productName}</div>
                        <div className={css.product_details_description}>{description}</div>
                        {
                            singleProductInformation
                                ?
                                <div className={css.product_information_container}>
                                    <ProductInformation singleProductInformation={singleProductInformation}/>
                                </div>
                                :
                                <></>
                        }
                        <div className={css.product_details_size_weight_container}>
                            {
                                category && category.name.toLocaleLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLocaleLowerCase()
                                    ?
                                    <div>
                                <span className={css.first_default_element}>
                                    <img className={css.default_images}
                                         src="https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/size.svg"
                                         alt="size"/>
                                </span>
                                        <span>
                                            Розмір: 30см
                                        </span>
                                    </div>
                                    :
                                    <></>
                            }
                            <div>
                                <span className={css.first_default_element}>
                                    <img className={css.default_images}
                                         src="https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/weight.svg"
                                         alt="weight"/>
                                </span>
                                <span>Вага: {product ? product.productWeight : productWeight}г</span>
                            </div>
                        </div>
                        <div className={
                            category && category.name.toLocaleLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLocaleLowerCase()
                                ?
                                css.product_details_order_container
                                :
                                css.product_details_order_container_specific_category
                        }>
                            {
                                category && category.name.toLocaleLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLocaleLowerCase()
                                    ?
                                    <div>
                                        <div className={css.add_ingredients} onClick={() => moveToIngredients()}>
                                            <span className={css.add_ingredient_button}>+</span>
                                            <span>Додати складники</span>
                                        </div>
                                        <div>
                                            Додатки: <span className={css.total_adds_count}>{selectedProductIngredientsTotalCount}</span> грн
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
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
                        <div className={css.selected_ingredient_container}>
                            <SelectedProductIngredients
                                id={id}
                                selectedProductIngredients={selectedProductIngredients}
                                selectedProductIngredientsId={selectedProductIngredientsId}
                            />
                        </div>
                        <div className={css.order_button_container}>
                            <button className={css.order_button}
                                    onClick={() => createOrder(product ? product.productPrice : productPrice, singleProduct, id)}>Додати у кошик
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                category && category.name.toLocaleLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLocaleLowerCase()
                    ?
                    <div className={css.product_ingredients_container}>
                        <div className={css.product_ingredients_text}>Додатки до {category.name}</div>
                        <ProductIngredients productIngredients={productIngredients} id={id} categoryId={categoryId}/>
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export { ProductDetails };
