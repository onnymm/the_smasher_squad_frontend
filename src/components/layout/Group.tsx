interface GroupParams extends GenericInvolverComponent {
    title?: string; // Título del grupo
}

/** 
 *  ## Grupo de elementos de vista
 *  Este componente renderiza un grupo contenedor de elementos.
 *  
 *  Este componente sirve para envolver elementos y mapearlos en display flex o
 *  grid así como para darles un estilizado y espacio homogéneos y poder
 *  construir vistas de forma muy rápida.
 *   
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *   
 *  ### Parámetros de entrada
 *  - [ `string` ] `title`: Título del grupo
 */ 
const Group: (config: GroupParams) => (React.JSX.Element) = ({
    children,
    title,
}) => {

    return (
        <div className="group ui-layout-group group-[.line-division]:last:pb-0 group-[.line-division]:pb-[calc(1.5rem_-_2px)] group-[.line-division]:pt-2 flex flex-col group-[.ui-grapper-center]:items-center gap-2 pb-[calc(1rem_-_2px)] last:pb-0 group-[.line-division]:dark:border-white/30 group-[.line-division]:border-gray-400/50 group-[.line-division]:last:dark:border-transparent group-[.line-division]:last:border-transparent border-b-2 border-b-transparent">
            {title &&
                <p className="self-center font-semibold">{title}</p>
            }
            {children}
        </div>
    )
}

export default Group;