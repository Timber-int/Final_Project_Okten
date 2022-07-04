import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const createCityValidator = Joi.object({
    cityName: Joi.string()
        .min(2)
        .max(30)
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"cityName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 30',
        }),

});
