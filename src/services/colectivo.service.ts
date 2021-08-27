import axios from "axios";
import { store } from "../store/store";

const do_get = async (endpoint: string) => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.user?.token
        }
    }

    const response = await axios.get(
        url + endpoint,
        requestConfig,
    );
    return response;
}

const get_one = async (id: number): Promise<Colectivos> => {
    
    const endpoint =`colectivos/${id}`;
    const  response = await do_get(endpoint);

    const colectivo: Colectivo = {
        id: response.data.id,
        nombre: response.data.nombre,
    }
    return [colectivo];

}

const get_all = async (): Promise<Colectivos> => {
    const endpoint = 'colectivos/';
    const response = await do_get(endpoint);
    const colectivos: Colectivos = response.data.results;
    return colectivos;
}

export const colectivoService = {
    get_one,
    get_all,
}