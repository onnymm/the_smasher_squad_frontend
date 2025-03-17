import mobiusAxios from "../axiosInstance";
import getBackendUrl from "../backendUrl";

const path = '/radar';

const url = {
    alliances: getBackendUrl(path + '/alliances'),
    scan: getBackendUrl(path + '/scan'),
    register: getBackendUrl(path + '/register'),
    delete: getBackendUrl(path + '/delete'),
};

class RadarTools {

    // Direcciones URL de endpoints del radar en la API
    url = url;

    constructor () {}

    /** 
     *  ## Escaneo de alianzas
     *  Esta función realiza la solicitud de datos de escaneo de alianzas y
     *  retorna los datos generados por el radar en la API
     */ 
    scan = async (): Promise<Mobius.API.AllianceData[]> => {

        // Obtención de respuesta del radar
        const response = await mobiusAxios.get(this.url.scan, { authenticate: true });

        return response.data;
    };

    /** 
     *  ## Obtención de alianzas registradas
     *  Esta función obtiene la lista de alianzas registradas para ser
     *  escaneadas por el radar.
     */ 
    get = async (): Promise<Mobius.API.AllianceData[]> => {

        // Obtención de las alianzas registradas
        const response = await mobiusAxios.get(this.url.alliances, { authenticate: true });

        return response.data;
    };

    register = async (name: string): Promise<boolean> => {

        // Obtención del estado de registro
        const response = await mobiusAxios.post(this.url.register, name, { authenticate: true });

        return response.data;
    };

    delete = async (name: string): Promise<void> => {

        // Remoción de una alianza del radar
        await mobiusAxios.delete(this.url.delete, { params: {'alliance_name': name}, authenticate: true });
    };
};

const Radar = new RadarTools();

export default Radar;
