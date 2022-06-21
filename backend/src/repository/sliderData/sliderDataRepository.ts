import { EntityRepository, getManager, Repository } from 'typeorm';
import { SliderData } from '../../entity';
import { ISliderDataRepository } from './sliderDataRepositoryInterface';

@EntityRepository(SliderData)
class SliderDataRepository extends Repository<SliderData> implements ISliderDataRepository {
    public async getAllSliders(): Promise<SliderData[]> {
        return getManager().getRepository(SliderData).find();
    }
}

export const sliderDataRepository = new SliderDataRepository();
