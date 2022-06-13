import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { Token } from '../../entity';
import { ITokenRepository } from './tokenRepositoryInterface';
import { ITokenDataToSave } from '../../interface/tokenInterfaces';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async getTokenById(userId: number): Promise<Token | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async saveTokeToDB(token: ITokenDataToSave): Promise<Token> {
        return getManager().getRepository(Token).save(token);
    }

    public async deleteTokenById(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }
}

export const tokenRepository = new TokenRepository();
