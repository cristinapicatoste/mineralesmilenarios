import {Image} from "../data/repository/images";
import {Mineral} from "../data/repository/minerals";
import {api} from "../data/repository";

export async function uiMineralFromMinerals(minerals: Mineral[]) {
    const images = await api.images().findByIds(minerals.map(x => x.image_id).filter(x => x !== null) as string[]);
    return minerals.map(x => ({...x, image: images.find(i => i.id === x.image_id) || null }))
}

export interface UiMineral extends Mineral {

    image: Image,
}