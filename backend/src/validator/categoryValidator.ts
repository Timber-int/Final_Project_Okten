import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const createCategoryValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    logo: Joi.string()
        .min(3)
        .max(30)
        .required()
        .trim()
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
});

export const updateCategoryValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
});
