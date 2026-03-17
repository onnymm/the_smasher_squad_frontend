import React, { useContext } from "react";
import { sidebarMenu } from "../../../settings/appSettings";
import StickySectionTag from "./StickySectionTag";
import RouteGroup from "./RouteGroup";
import ButtonTextIcon from "../../ui/button/ButtonTextIcon";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { TokenContext } from "../../../contexts/tokenContext";

/** 
 *  ## Sección de menú de la barra lateral
 *  Este componente renderiza la sección de menú de la barra lateral.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const SidebarContent = () => {

    const { setToken } = useContext(TokenContext)

    const logOut = () => {
        setToken(null);
    };

    return (
        <div className="flex flex-col flex-grow justify-between">
            <div className="flex flex-col flex-grow gap-4">

                {
                    sidebarMenu.map(
                        (section, sectionKey) => (
                            // Se renderiza todo dentro de otro contenedor para
                            //      utilizar el 100% de altura del contenedor padre
                            //      que usa la propiedad flex-grow.
                            <div className="w-full h-min"  key={sectionKey}>
                                {/* Título de la sección */}
                                <StickySectionTag>
                                    {section.name}
                                </StickySectionTag>
                                
                                {/* Mapeo de grupos */}
                                {
                                    section.groups.map(
                                        (group, groupKey) => (
                                            <RouteGroup key={groupKey} {...group} />
                                        )
                                    )
                                }
                            </div>
                        )
                    )
                }
            </div>
            <div className="group ui-layout-group flex w-full">
                <ButtonTextIcon icon={ArrowRightEndOnRectangleIcon} onClick={logOut} type="danger">
                    Cerrar sesión
                </ButtonTextIcon>
            </div>
        </div>
    )
}

export default React.memo(SidebarContent);
