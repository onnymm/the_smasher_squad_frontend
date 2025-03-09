import mobiusAxios from "../axiosInstance";
import getBackendUrl from "../backendUrl";

interface _DataFromAPI {
    player: PlayerDataFromAPI;
    coords: Mobius.Backend.BasePlayerCoords[];
    alliance: AllianceDataFromAPI;
}

interface SearchPlayerParams {
    playerName: string;
    setPlayerInfo: React.Dispatch<React.SetStateAction<_DataFromAPI | undefined | boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 *  
 *  ## Búsqueda de jugador en la API de Galaxy Life
 *  Esta función realiza una búsqueda del jugador proporcionado, en la API de
 *  Galaxy Life usando el servidor backend y los retorna en la función de
 *  cambio de estado proporcionada.
 */
const searchPlayer: (config: SearchPlayerParams) => Promise<void> = async ({
    playerName,
    setPlayerInfo,
    setLoading
}) => {

    // Se activa el estado de carga
    setLoading(true);
    // Obtención de los datos del jugador
    const response = await mobiusAxios.get(getBackendUrl('/players/search/'), {params: {name: playerName}, authenticate: true});
    // Se establecen los datos en el estado
    setPlayerInfo(response.data)
    // Se desactiva el estado de carga
    setLoading(false);
}

export default searchPlayer;
