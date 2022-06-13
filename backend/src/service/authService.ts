import { IUser } from '../entity';
import { ITokenPair } from '../interface/tokenInterfaces';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(user: IUser): Promise<ITokenPair> {
        return this._getTokenPair(user);
    }

    private async _getTokenPair(user: IUser): Promise<ITokenPair> {
        const { id, email } = user;

        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });

        const { accessToken, refreshToken } = tokenPair;

        await tokenService.saveTokenToDB({ userId: id, accessToken, refreshToken });

        return {
            accessToken,
            refreshToken,
        };
    }
}

export const authService = new AuthService();
