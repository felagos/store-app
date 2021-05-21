import * as Joi from "joi";

export const envSchema = Joi.object({
    APP_PORT: Joi.number().required()
});