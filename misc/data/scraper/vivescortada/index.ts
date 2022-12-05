import {parse} from "node-html-parser";
import {api} from "../../repository";
import {MineralSource} from "../../repository/mineralSource";

interface ScrapeResult {
    name:string |undefined,
    link:string,
    description:string |undefined,
    description_2:string |undefined,
    features:any
}

const cleanup = (input:string|undefined):string|undefined => {
    if (!input) {
        return input;
    }
    input = input.replace(/\n/g, '\n');
    input = input.replace(/\n /g, '\n');
    input = input.replace(/\t/g, ' ');
    input = input.replace(/ +/g, ' ');
    return input;
}

export default async function scrapeVivesCortada() {
    const rootPage = await fetch('https://vivescortadaimport.com/diccionario-minerales/index.php')
        .then(x => x.text());
    const root = parse(rootPage);
    const links = root.querySelectorAll("#sidebar a")
        .map(x => 'https://vivescortadaimport.com/diccionario-minerales/' + x.getAttribute("href"));

    const pages = await Promise.all(links.map( async (link) => {
        const html = await fetch(link).then(x => x.text());
       return {
           link,
           html
       }
    }));

    const data = pages.map((page):ScrapeResult => {
        const html = parse(page.html);
        const liArray = html.querySelectorAll("div.well.own-text-mineral li");
        const features = liArray.reduce((prev, next) => {
            const key = next.childNodes[0]?.innerText?.trim().toLowerCase();
            const value = next.childNodes.slice(1).map((x:any)=> {
                return x.outerHTML||x.textContent
            }).join('');
            return {...prev, [key]:value}
        }, {});
        return {
            link: page.link,
            name: html.querySelector('h1[itemprop="name"]')?.innerText,
            description: html.querySelectorAll('.own-text-mineral')[1]?.innerText,
            description_2: html.querySelectorAll('.own-text-mineral')[2]?.innerText,
            features,
        }
    }).map(x => {
        return {
            ...x,
            name: cleanup(x.name),
            description: cleanup(x.description),
            description_2: cleanup(x.description_2),
        }
    });
    const source = await api.sources().findByField('name', 'Vives de la Cortada');
    if (!source) {
        throw Error("Can not find source");
    }
    const sourceData:Partial<MineralSource>[] = data.map(x => {
        return {
            source_id: source.id,
            url: x.link,
            data: x
        }
    });
    console.log(`Going to insert ${sourceData.length}`)

    const response = await api.mineralSource().upsertManyOnUrl(sourceData);

}