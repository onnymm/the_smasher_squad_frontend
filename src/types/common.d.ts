interface TextInvolverComponent {
    children: string;
}

interface SingleJSXInvolverComponent {
    children: React.JSX.Element;
}

interface GenericInvolverComponent {
    children: string | React.JSX.Element | Array<React.JSX.Element | string | boolean>
}

type IconType = React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
} & React.RefAttributes<SVGSVGElement>>