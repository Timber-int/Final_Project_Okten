export const CONSTANTS = {
    AUTHORIZATION: 'Authorization',
    HASH_SALT: 15,
    DATA_BASE: 'Online_shop',
    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    NAME_REGEX: new RegExp(/^(([a-zA-Z-]{1,30})|([а-яА-ЯЁёІіЇїҐґЄє-]{1,30}))$/u),

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],
};
export const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
    MANAGER: 'manager',
    CUSTOMER: 'customer',
};

export const TokenType = {
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    ACTION: 'ACTION',
};
