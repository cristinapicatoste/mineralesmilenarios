import Link from "next/link";

interface ParentBreadcrumb {
    href:string,
    title:string,
}
interface Props {
    currentTitle:string,
    parents: ParentBreadcrumb[]
}

export default function Breadcrumbs(props:Props) {
    return (
        <div className="border-b border-gray-200">
            <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ol role="list" className="flex items-center space-x-4 py-4">
                    {props.parents.map((breadcrumb) => (
                        <li key={breadcrumb.href}>
                            <div className="flex items-center">
                                <Link href={breadcrumb.href}>
                                    <a className="mr-4 text-sm font-medium text-gray-900">
                                        {breadcrumb.title}
                                    </a>
                                </Link>
                                <svg
                                    viewBox="0 0 6 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="h-5 w-auto text-gray-300"
                                >
                                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                                </svg>
                            </div>
                        </li>
                    ))}
                    <li className="text-sm">
                        <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                            {props.currentTitle}
                        </a>
                    </li>
                </ol>
            </nav>
        </div>
    );
}