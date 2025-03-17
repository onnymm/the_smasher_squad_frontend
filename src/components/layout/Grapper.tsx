import Group from "./Group"; // eslint-disable-line

interface GrapperParams extends GenericInvolverComponent {
    groupDivisions?: boolean;
    justify?: 'start' | 'center';
}

/** 
 *  ## Contenedor
 *  Este componente renderiza un contenedor para una página de la aplicación.
 *   
 *  `< tsx />` Se autocierra.
 *   
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `groupDivisions`: Indicador de si los elementos.
 *  - [ `literal` ] `justify`: Justificación horizontal del contenido.
 *  <{@link Group} /> contenidos renderizarán una línea divisora.
*/
const Grapper: (config: GrapperParams) => (React.JSX.Element) = ({
    children,
    groupDivisions = false,
    justify = 'start',
}) => {

    const uiGroup = {
        'start': '',
        'center': 'ui-grapper-center',
    }

    return (
        <div className={`${groupDivisions ? 'group line-division' : ''} ${uiGroup[justify]} items-${justify} group backdrop-blur-sm flex flex-col gap-2 border-gray-500/50 bg-gray-500/10 p-4 border rounded-lg w-full h-full max-h-[calc(100%_-_4rem)]`}>
            { children }
        </div>
    )
}

export default Grapper;