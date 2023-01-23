import { EmailActionEnum } from './enums';

export const emailInformation = {
    [EmailActionEnum.LOGIN]: {
        subject: 'Hi!!!',
        templateName: 'login',
    },
    [EmailActionEnum.LOGOUT]: {
        subject: 'See you soon!!!',
        templateName: 'logout',
    },
    [EmailActionEnum.REGISTRATION]: {
        subject: 'Welcome!!!',
        templateName: 'registration',
    },

    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Don\' worry you always car change you password!!!',
        templateName: 'forgotPassword',
    },

    [EmailActionEnum.CHANGE_PASSWORD]: {
        subject: 'You password is change!!!',
        templateName: 'changePassword',
    },
    [EmailActionEnum.SEND_SURPRISE_MESSAGE]: {
        subject: 'Our sincere congratulations, we are glad that you are with us!!!',
        templateName: 'surpriseMessage',
    },
    [EmailActionEnum.REQUEST_PARTNERS_MESSAGE]: {
        subject: 'Partners request',
        templateName: 'partnersRequest',
    },
    [EmailActionEnum.SEND_ORDER_DATA]: {
        subject: 'Send order data',
        templateName: 'orderData',
    },
};
