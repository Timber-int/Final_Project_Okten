import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const orderCardValidatorShopDeliver = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"firstName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"lastName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    street: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.empty': '"Street" Can not be empty',
            'string.pattern.base': 'Street not valid',
        }),
    city: Joi.string()
        .alphanum()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': '"City" Can not be empty',
            'string.pattern.base': 'City not valid',
        }),
    houseNumber: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'number.empty': '"telephone" Can not be empty',
            'number.pattern.base': 'Enter only number min 0 max 1000000',
        }),
    orderComment: Joi.string()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"orderComment" Can not be empty',
            'string.pattern.base': 'orderComment not valid',
        }),
    entrance: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'number.empty': '"entrance" Can not be empty',
            'number.pattern.base': 'Enter only number min 0 max 1000000',
        }),
    flour: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'number.empty': '"flour" Can not be empty',
            'number.pattern.base': 'Enter only number min 0 max 1000000',
        }),
    office: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'number.empty': '"office" Can not be empty',
            'number.pattern.base': 'Enter only number min 0 max 1000000',
        }),
    intercom: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'number.empty': '"intercom" Can not be empty',
            'number.pattern.base': 'Enter only number min 0 max 1000000',
        }),
    addressComment: Joi.string()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"addressComment" Can not be empty',
            'string.pattern.base': 'addressComment not valid',
        }),
});
export const orderCardValidatorCustomerDeliver = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"firstName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"lastName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    address: Joi.string()
        .alphanum()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': '"City" Can not be empty',
            'string.pattern.base': 'City not valid',
        }),
    orderComment: Joi.string()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"orderComment" Can not be empty',
            'string.pattern.base': 'orderComment not valid',
        }),
});
