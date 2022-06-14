import Joi from 'joi';

export const createProductInformationValidator = Joi.object({
    productProteins: Joi.number()
        .min(0)
        .max(10000)
        .required()
        .messages({
            'string.empty': '"productProteins" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productCarbohydrates: Joi.number()
        .min(0)
        .max(10000)
        .required()
        .messages({
            'string.empty': '"productCarbohydrates" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productFats: Joi.number()
        .min(0)
        .max(10000)
        .required()
        .messages({
            'string.empty': '"productFats" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productCalories: Joi.number()
        .min(0)
        .max(10000)
        .required()
        .messages({
            'string.empty': '"productCalories" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productId: Joi.number()
        .min(0)
        .required()
        .messages({
            'string.empty': '"productId" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
});
export const updateProductInformationValidator = Joi.object({
    productProteins: Joi.number()
        .min(0)
        .max(10000)
        .messages({
            'string.empty': '"productProteins" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productCarbohydrates: Joi.number()
        .min(0)
        .max(10000)
        .messages({
            'string.empty': '"productCarbohydrates" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productFats: Joi.number()
        .min(0)
        .max(10000)
        .messages({
            'string.empty': '"productFats" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
    productCalories: Joi.number()
        .min(0)
        .max(10000)
        .messages({
            'string.empty': '"productCalories" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 10000',
        }),
});
