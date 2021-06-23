import * as Joi from "joi";

export const envSchema = Joi.object({
    APP_PORT: Joi.number().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    JWT_KEY: Joi.string().required(),
    JWT_EXPIRE: Joi.number().required()
});