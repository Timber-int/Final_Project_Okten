import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const createProductIngredientValidator = Joi.object({
    productIngredientName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': '"productIngredientName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),

    productPrice: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"productPrice" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    productWeight: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"productWeight" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    productPhoto: Joi.any()
        .required(),
});

export const updateProductIngredientValidator = Joi.object({
    productIngredientName: Joi.string()
        .min(3)
        .max(30)
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"productIngredientName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),

    productPrice: Joi.number()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"productPrice" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    productWeight: Joi.number()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"productWeight" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
});