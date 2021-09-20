import axios from "axios";
import { store } from "../store/store";



const get_all = async (colectivoSelected: number[], currentPage = 0): Promise<Cargos> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        },
        params: { colectivos: colectivoSelected },
    }

    const response = await axios.get(
        url + 'cargos/',
        requestConfig,
    );

    const cargos: Cargos = {
        rows: response.data.results,
        nextPage: response.data.next,
        prevPage: response.data.previous,
        count: response.data.count,
        currentPage: currentPage,
    }

    return cargos;

}

const get_page = async (url: string, currentPage = 0): Promise<Cargos> => {
    const state = store.getState();

    let cargos: Cargos = {
        rows: [],
        nextPage: '',
        prevPage: '',
        currentPage: currentPage,
        count: 0,
    }

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        },
    }

    const response = await axios.get(
        url,
        requestConfig,
    );

    cargos.count = response.data.count;
    cargos.nextPage = response.data.next;
    cargos.prevPage = response.data.previous;
    cargos.rows = response.data.results;

    return cargos;
}

const search = async (needle: string): Promise<Cargos> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let cargos: Cargos = {
        rows: [],
        nextPage: '',
        prevPage: '',
        currentPage: 0,
        count: 0,
    }

    let termino1: string = needle;
    let termino2: string = '';
    if (needle.split(' ').length === 2) {
        termino1 = needle.split(' ')[0];
        termino2 = needle.split(' ')[1];
    }

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        },
        params: { termino1, termino2 },
    }

    const response = await axios.get(
        url + "buscar/",
        requestConfig,
    );

    cargos.count = response.data.count;
    cargos.nextPage = response.data.next;
    cargos.prevPage = response.data.previous;
    cargos.rows = response.data.results;

    return cargos;
}

const create = async (cargo: Cargo): Promise<Cargo> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let requestConfig = {
        params: { ...cargo },

    }

    const response = await axios.post(url + 'cargos/', {
        ...cargo
    }, {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        }
    });

    console.log(response);

    return response.data;

}



export const cargoService = {
    get_all,
    get_page,
    search,
    create,
}