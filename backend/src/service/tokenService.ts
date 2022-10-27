import jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';
import {
    IActionTokenDataToSave, ITokenDataToSave, ITokenPair, IUserPayload,
} from '../interface';
import { config } from '../config';
import { IToken, IActionToken } from '../entity';
import { actionTokenRepository, tokenRepository } from '../repository';
import { TokenType } from '../constants';

class TokenService {
    public async generateTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: config.EXPIRES_IN_ACCESS });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: config.EXPIRES_IN_REFRESH });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokenToDB(tokenDataToSave: ITokenDataToSave): Promise<IToken> {
        const { accessToken, refreshToken, userId } = tokenDataToSave;

        const tokenFromDB = await tokenRepository.getTokenById(userId);

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.saveTokeToDB(tokenFromDB);
        }

        return tokenRepository.saveTokeToDB(tokenDataToSave);
    }

    public async getTokenById(userId: number): Promise<IToken | undefined> {
        return tokenRepository.getTokenById(userId);
    }

    public async verifyToken(token: string, tokenType: string): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === TokenType.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (tokenType === TokenType.ACTION) {
            secretWord = config.SECRET_PASSWORD_KEY;
        }
        console.log(token);
        return jwt.verify(token, secretWord as string) as IUserPayload;
    }

    public async deleteToken(userId: number): Promise<DeleteResult> {
        return tokenRepository.deleteTokenById(userId);
    }

    public async generateActionToken(payload: IUserPayload): Promise<string> {
        return jwt.sign(payload, config.SECRET_PASSWORD_KEY as string, { expiresIn: config.EXPIRES_IN_ACTION });
    }

    public async saveActionTokenToDB(actionTokenDataToSave: IActionTokenDataToSave): Promise<IActionToken> {
        const { actionToken, userId } = actionTokenDataToSave;

        const actionTokenFromDB = await actionTokenRepository.getActionTokenById(userId);

        if (actionTokenFromDB) {
            actionTokenFromDB.actionToken = actionToken;
            return actionTokenRepository.saveActionTokeToDB(actionTokenFromDB);
        }

        return actionTokenRepository.saveActionTokeToDB(actionTokenDataToSave);
    }

    public async getActionTokenById(userId: number): Promise<IActionToken | undefined> {
        return actionTokenRepository.getActionTokenById(userId);
    }

    public async deleteActionToken(userId: number): Promise<DeleteResult> {
        return actionTokenRepository.deleteActionTokenById(userId);
    }
}

export const tokenService = new TokenService();
