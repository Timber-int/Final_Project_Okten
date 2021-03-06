import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'SECRET_REFRESH_KEY',
    SECRET_PASSWORD_KEY: process.env.SECRET_PASSWORD_KEY || 'SECRET_PASSWORD_KEY',
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS || '20m',
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '1d',
    EXPIRES_IN_ACTION: process.env.EXPIRES_IN_ACTION || '1d',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
