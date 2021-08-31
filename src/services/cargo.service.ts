import axios from "axios";
import { store } from "../store/store";



const get_all = async (colectivoSelected: number[]): Promise<Cargos> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        },
        params: {colectivos: colectivoSelected},
    }

    const response = await axios.get(
        url + 'cargos/',
        requestConfig,
    );

    const cargos: Cargos = response.data.results;
    return cargos;

}


export const cargoService = {
    get_all,
}