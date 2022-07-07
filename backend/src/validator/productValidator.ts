import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const createProductValidator = Joi.object({
    productName: Joi.string()
        .min(3)
        .max(100)
        .required()
        // .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"productName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 100',
        }),

    description: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"description" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
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
    categoryId: Joi.number()
        .min(0)
        .required()
        .messages({
            'string.empty': '"categoryId" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
});

export const updateProductValidator = Joi.object({
    productName: Joi.string()
        .min(3)
        .max(100)
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"productName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 100',
        }),
    description: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"description" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
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
    categoryId: Joi.number()
        .min(0)
        .required()
        .messages({
            'string.empty': '"categoryId" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
});
