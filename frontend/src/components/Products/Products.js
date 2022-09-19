import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { Product } from '../Product/Product';
import { SearchBar } from '../SearchBar/SearchBar';
import { AccordionQuestion } from '../AccordionQuestion/AccordionQuestion';
import { PizzaReadMoreReadLess } from '../PizzaReadMoreReadLess/PizzaReadMoreReadLess';
import { BurgerReadMoreReadLess } from '../BurgerReadMoreReadLess/BurgerReadMoreReadLess';
import { DrinkReadMoreReadLess } from '../DrinkReadMoreReadLess/DrinkReadMoreReadLess';
import { getAllProducts, getCategoryById, productAction } from '../../store';
import { DEFAULT_CATEGORY_NAME } from '../../constants';
import css from './Product.module.css';
import { SushiReadMoreReadLess } from '../SushiReadMoreReadLess/SushiReadMoreReadLess';

const Products = () => {

    const { state: productCategory } = useLocation();

    const {
        products,
    } = useSelector(state => state['productReducer']);

    const {
        category,
    } = useSelector(state => state['categoryReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productAction.clearSelectedIngredientsArray());
        dispatch(getAllProducts());
        dispatch(getCategoryById({ id: productCategory ? productCategory.id : 1 }));
    }, [productCategory]);

    return (
        <div className={css.content}>
            {
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    <div className={css.product_carousel}>
                        <ImageCarousel controls indicators/>
                    </div>
                    :
                    <></>
            }

            <h1 className={
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    css.products_text
                    :
                    css.products_text_min_margin
            }>
                {category?.name}
            </h1>
            <div className={css.search_bar_container}>
                <SearchBar category={category} products={products}/>
            </div>

            <div className={css.product_container}>
                {
                    [...products].filter(product => product.categoryId === category?.id)
                        .map(product =>
                            <Product key={product.id} product={product} category={category}/>
                        )
                }
            </div>
            {
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    <div className={css.pizza_more_information_container}>
                        <PizzaReadMoreReadLess/>
                    </div>
                    :
                    <></>
            }
            {
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.SUSHI.toLowerCase()
                    ?
                    <div className={css.sushi_more_information_container}>
                        <SushiReadMoreReadLess/>
                    </div>
                    :
                    <></>
            }
            {
            category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.BURGER.toLowerCase()
                ?
                <div className={css.burger_more_information_container}>
                    <BurgerReadMoreReadLess/>
                </div>
                :
                <></>
        }    {
            category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.DRINKS.toLowerCase()
                ?
                <div className={css.drink_more_information_container}>
                    <DrinkReadMoreReadLess/>
                </div>
                :
                <></>
        }
            {
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    <div className={css.question_container}>
                        <div className={css.header_question_text}>
                            Frequently asked Questions
                        </div>
                        <div className={css.accordion_container}>
                            <AccordionQuestion/>
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export { Products };
