import axios from "axios";
import userTemplate from "../constants/userTemplate";
import getBackendUrl from "../api/backendUrl";
import mobiusAxios from "../api/axiosInstance";

interface UserAuthentication {
    token: string | null; // Token de autenticación.
    setToken: React.Dispatch<React.SetStateAction<string | null>>; // Función de cambio de estado de valor del token .
    setUser: React.Dispatch<React.SetStateAction<CurrentUserData>> // Función de cambio de estado de datos de perfil del usuario actual.
};

/** 
 *  ## Obtención de los datos del usuario
 *  Esta función obtiene los datos del perfil de usuario actual de la
 *  aplicación.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | null` ] `token`: Token de autenticación.
 *  - [ {@link React.Dispatch<SetStateAction>} ] `setToken`: Función de cambio
 *  de estado de valor del token .
 *  - [ {@link React.Dispatch<SetStateAction>} ] `setUser`: Función de cambio
 *  de estado de datos de perfil del usuario actual.
 */ 
const fetchUser: (config: UserAuthentication) => (Promise<void>) = async ({
    token,
    setToken,
    setUser,
}) => {

    if ( !token ) {
        setUser(userTemplate);
        return;
    }

    try {
        // Envío de solicitud al api
        const response = await mobiusAxios.get(getBackendUrl('/account/me/'), { authenticate: true })
        setUser(response.data)
    }

    // En caso de no ser autenticado se elimina el token
    catch ( error ) {

        if ( axios.isAxiosError(error) && error.code === "ERR_BAD_REQUEST" ) {
            setToken(null);
            setUser(userTemplate);
        } else {
            console.error("Hubo un problema al autenticar el usuario:", error)
        }
    }
}

export default fetchUser;