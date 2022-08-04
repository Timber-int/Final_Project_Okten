import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const partnersRequestValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"Name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    phone: Joi.string()
        .required()
        .regex(CONSTANTS.PHONE_REGEXP)
        .messages({
            'string.empty': '"phone" Can not be empty',
            'string.pattern.base': 'Enter only letter min 10 max 14',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    message: Joi.string()
        .min(3)
        .max(65535)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'message not valid',
        }),

});
