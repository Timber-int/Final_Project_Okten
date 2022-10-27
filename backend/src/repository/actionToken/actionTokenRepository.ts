import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { ActionToken } from '../../entity';
import { IActionTokenRepository } from './actionTokenRepositoryInterface';
import { IActionTokenDataToSave } from '../../interface';

@EntityRepository(ActionToken)
export class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async getActionTokenById(userId: number): Promise<ActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne({ userId });
    }

    public async saveActionTokeToDB(actionToken: IActionTokenDataToSave): Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(actionToken);
    }

    public async deleteActionTokenById(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(ActionToken).delete({ userId });
    }
}

export const actionTokenRepository = new ActionTokenRepository();
