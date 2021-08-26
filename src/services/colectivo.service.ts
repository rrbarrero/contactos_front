import axios from "axios";
import { store } from "../store/store";

const get_one = async (id: number): Promise<string> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.user?.token
        }
    }

    const response = await axios.get(
        url + `colectivos/${id}`,
        requestConfig,
    );

    const colectivo: Colectivo = {
        id: response.data.id,
        nombre: response.data.nombre,
    }
    return colectivo.nombre;

}

export const colectivoService = {
    get_one,
}