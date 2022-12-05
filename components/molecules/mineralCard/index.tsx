import {Mineral} from "../../../misc/data/repository/minerals";
import Image from 'next/image';
import Link from 'next/link';
import {UiMineral} from "../../../misc/aggregates/UiMineral";

const shortenText = (text:string, max:number) => {
    if (!text) {
        return text;
    }
    return text.split(' ')
        .reduce((prev, next) => {
            if (prev.state === 'stop') {
                return prev;
            }
            if (prev.text.length + next.length > max) {
                return {
                    state: 'stop',
                    text: prev.text + '...'
                }
            }
            return {
                state: 'go',
                text:  prev.text + ' ' + next
            }
        }, {state: 'go', text: ''}).text;
}

export default function MineralCard(props:UiMineral) {
    return (
        <div
            key={props.id}
            className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
        >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none">
                {props.image && <Image
                    src={props.image.url}
                    height={props.image.height}
                    width={props.image.width}
                    alt={props.name}
                    layout="responsive"
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />}
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link href={props.slug}>
                        <a>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {props.name}
                        </a>
                    </Link>
                </h3>
                <p className="text-sm text-gray-500">{shortenText(props.description, 60)}</p>
                <div className="flex-1 flex flex-col justify-end">
                    <p className="text-sm italic text-gray-500" dangerouslySetInnerHTML={{__html: props.formula}}></p>
                    <p className="text-base font-medium text-gray-900">{props.name}</p>
                </div>
            </div>
        </div>
    );
}