/** 
 *  ## Miniatura chico
 *  Este componente renderiza una imagen de miniatura de `1.5rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 */ 
const ThumbNailSmall: (config: BaseImageComponent) => (React.JSX.Element) = ({
    data,
    alt = "",
}) => {

    return (
        <div className="relative rounded-full max-w-6 h-6">
            <img src={data} alt={alt} />
        </div>
    )
}

export default ThumbNailSmall;
