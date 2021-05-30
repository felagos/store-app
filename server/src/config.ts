import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        port: process.env.APP_PORT,
        database: {
            name: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }
    }
});