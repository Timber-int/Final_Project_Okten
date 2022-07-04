import Joi from 'joi';

export const createCityAddressValidator = Joi.object({
    addressName: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'string.empty': '"addressName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 30',
        }),
    cityId: Joi.number()
        .required(),
});
