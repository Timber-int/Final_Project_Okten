import { SliderData } from '../entity';
import { sliderDataRepository } from '../repository';

class SliderDataService {
    public async getAllSliders(): Promise<SliderData[]> {
        return sliderDataRepository.getAllSliders();
    }
}

export const sliderDataService = new SliderDataService();
