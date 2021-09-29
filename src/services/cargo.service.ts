import { AxiosBr } from "../helpers";


const get_all = async (colectivoSelected: number[], currentPage = 0): Promise<Cargos> => {

    let requestConfig = {
        params: { colectivos: colectivoSelected },
    }

    const client = AxiosBr();
    const response = await client.get('cargos/', requestConfig);

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

    let cargos: Cargos = {
        rows: [],
        nextPage: '',
        prevPage: '',
        currentPage: currentPage,
        count: 0,
    }

    const client = AxiosBr();
    const response = await client.get(url)

    cargos.count = response.data.count;
    cargos.nextPage = response.data.next;
    cargos.prevPage = response.data.previous;
    cargos.rows = response.data.results;

    return cargos;
}

const search = async (needle: string): Promise<Cargos> => {

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
        params: { termino1, termino2 },
    }

    const client = AxiosBr();
    const response = await client.get('buscar/', requestConfig);

    cargos.count = response.data.count;
    cargos.nextPage = response.data.next;
    cargos.prevPage = response.data.previous;
    cargos.rows = response.data.results;

    return cargos;
}

const create = async (cargo: Cargo): Promise<Cargo> => {

    const { telefonos, correos, ...data } = cargo;

    const client = AxiosBr();
    const response = await client.post('cargos/', {
        ...data,
        persona: cargo.persona.id,
        provincia: cargo.provincia.id,
        pais: cargo.pais.id,
        colectivo: cargo.colectivo.id,
        subcolectivo: cargo.subcolectivo.id,
    });

    return response.data;

}

const get_one = async (cargoId: number): Promise<Cargo> => {
    const client = AxiosBr();
    const response = await client.get(`cargos/${cargoId}`);
    return response.data;
}


export const cargoService = {
    get_one,
    get_all,
    get_page,
    search,
    create,
}