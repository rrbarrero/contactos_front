import axios from "axios";
import { store } from "../store/store";

const do_get = async (endpoint: string) => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        }
    }

    const response = await axios.get(
        url + endpoint,
        requestConfig,
    );
    return response;
}


const get_all = async (colectivoSelected: number[]): Promise<Cargos> => {
    const endpoint = 'cargos/';
    const response = await do_get(endpoint);
    const cargos: Cargos = response.data.results;
    return cargos;

}


export const cargoService = {
    get_all,
}