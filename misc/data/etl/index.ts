import {Mineral} from "../repository/minerals";
import {MineralSource} from "../repository/mineralSource";
import {api} from "../repository";
import {Source} from "../repository/source";

export const processAllMinerals = async () => {
    let minerals = await api.minerals().findAll();
    const sources = await api.sources().findAll();
    const mineralSources = await  api.mineralSource().findAll();
    minerals = await Promise.all(minerals.map(x => processMineral(x, sources, mineralSources.filter(y => y.mineral_id===x.id))));
    await api.minerals().upsertMany(minerals);
}
const capitalise = (text:string):string => text.split(' ').map(x => x.at(0).toUpperCase() + x.slice(1)).join(' ')

const normaliseData = (mineral:Mineral) => {
    mineral.name = mineral.name.replace(/"/g,"");
    mineral.name = mineral.name.toLowerCase();
    mineral.name = capitalise(mineral.name);
    if (!mineral.slug) {
        mineral.slug = mineral.name;
        mineral.slug = mineral.slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        mineral.slug = mineral.slug.trim();
        mineral.slug = mineral.slug.replace(/[\W_]+/g,"-");
    }
}
const processVivesDeLaCortada = (mineral:Mineral, mSource:MineralSource) => {
    if (!mineral.formula && mSource.data.features['composición']) {
        mineral.formula = mSource.data.features['composición'];
    }
    if (!mineral.description && mSource.data.description) {
        mineral.description = mSource.data.description;
    }
}

const processMineral = async (mineral:Mineral, sources:Source[], dataSources:MineralSource[]):Promise<Mineral> => {
    dataSources.map(x => {
        const source = sources.find(source => source.id === x.source_id);
        if (source.name === 'Vives de la Cortada') {
            processVivesDeLaCortada(mineral, x);
        }
    });
    normaliseData(mineral);
    return mineral;
}