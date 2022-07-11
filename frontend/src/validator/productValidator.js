import Joi from 'joi';

export const createProductValidator = Joi.object({
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
    productBigPhoto: Joi.any()
        .required()
});
