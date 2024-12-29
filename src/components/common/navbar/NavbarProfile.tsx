import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import AvatarLarge from "../../avatar/AvatarLarge";

/** 
 *  ## Sección de perfil en barra superior
 *  Este componente renderiza la sección del perfil del usuario que se
 *  visualiza en la barra superior de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const NavbarProfile: () => (React.JSX.Element) = () => {

    // Obtención de los datos de perfil del usuario actual
    const currentUser = useContext(UserContext);

    console.log(currentUser.avatar);
    

    return (
        <div id="navbar-profile" className="flex flex-row items-center gap-2 w-max h-full">
            <div className="sm:block hidden">
                <p className="justify-end font-semibold text-end text-sm">{currentUser.name}</p>
                <p className="text-end text-gray-400 text-xs">{currentUser.user}</p>
            </div>
            <AvatarLarge data={currentUser.avatar} alt="Profile" online={true} />
        </div>
    );
};

export default NavbarProfile;
