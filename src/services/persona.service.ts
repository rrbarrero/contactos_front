import axios from "axios";
import { store } from "../store/store";


const get_persona = async (id: number): Promise<Persona> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    let persona: Persona = {
        id: id,
        nombre: '',
        apellidos: '',
        tratamiento: {
            nombre: '',
        },

    }

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        },
    }

    const response = await axios.get(
        url + `personas/${id}`,
        requestConfig,
    );

    persona.nombre = response.data.nombre;
    persona.apellidos = response.data.apellidos;

    return persona;
}

const create = async (persona: Persona): Promise<Persona> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";
    const state = store.getState();

    const response = await axios.post(url + 'personas/', {
        nombre: persona.nombre, 
        apellidos: persona.apellidos, 
        tratamiento: persona.tratamiento.id,
    }, {
        headers: {
            Authorization: "Bearer " + state.authentication.token
        }
    });

    console.log(response);

    return response.data;

}



export const personaService = {
    get_persona,
    create,
}