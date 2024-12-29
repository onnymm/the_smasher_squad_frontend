import axios from "axios";
import tokenInterceptor from "../security/tokenInterceptor";

// Inicialización de instancia modificada de Axios
const mobiusAxios = axios.create()

// Registro de interceptors
mobiusAxios.interceptors.request.use(tokenInterceptor)

// Exportación de la instancia
export default mobiusAxios;