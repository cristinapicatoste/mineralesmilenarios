
interface Props {
    title:string;
    subtitle?:string;
}
export default function Title(props:Props) {
    return (<div className="border-b border-gray-200 pt-24 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{props.title}</h1>
        <p className="mt-4 text-base text-gray-500">
            {props.subtitle}
        </p>
    </div>)
}