import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepositoryInterface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getAllUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(User).findOne({ id });
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User).findOne({ email });
    }

    public async createUser(data: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(data);
    }

    public async updateUser(id: number, data: Partial<IUser>): Promise<UpdateResult> {
        return getManager().getRepository(User).update({ id }, data);
    }
}

export const userRepository = new UserRepository();
