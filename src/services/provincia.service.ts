import axios from "axios";
import { store } from "../store/store";

const do_get = async (endpoint: string) => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication?.token
        }
    }

    const response = await axios.get(
        url + endpoint,
        requestConfig,
    );
    return response;
}

const get_all = async (): Promise<Provincias> => {
    const endpoint = 'provincias/?limit=300';
    const response = await do_get(endpoint);
    const provincias: Provincias = response.data.results;
    return provincias;
}

export const provinciaService = {
    get_all,
}