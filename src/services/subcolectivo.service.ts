import axios from "axios";
import { store } from "../store/store";

const get_subcolectivos = async (colectivo: Colectivo): Promise<SubColectivos> => {

    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication?.token
        },
    }

    const response = await axios.get(
        url + `colectivos/${colectivo.id}/subcolectivos`,
        requestConfig,
    );

    const subcolectivos: SubColectivos = response.data.results;
    return subcolectivos;

}

export const subColectivoService = {
    get_subcolectivos,
}