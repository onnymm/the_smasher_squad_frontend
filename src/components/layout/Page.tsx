const Page: (config: GenericInvolverComponent) => (React.JSX.Element) = ({
    children
}) => {

    return (
        <div id="page" className="flex flex-col gap-4 h-full">
            {children}
        </div>
    )
}

export default Page;