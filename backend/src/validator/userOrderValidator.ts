import Joi from 'joi';

export const createProductOrderValidator = Joi.object({
    productName: Joi.string()
        .min(3)
        .max(100)
        .required()
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
    productPhoto: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"productPhoto" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    productBigPhoto: Joi.string()
        .allow(null)
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"productBigPhoto" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    productIngredients: Joi.string()
        .min(0)
        .max(255)
        .required()
        .messages({
            'string.empty': '"productIngredients" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 255',
        }),
    productPrice: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"productPrice" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    totalCount: Joi.number()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"totalCount" Can not be empty',
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
    productId: Joi.number()
        .min(0)
        .required()
        .messages({
            'string.empty': '"productId" Can not be empty',
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
