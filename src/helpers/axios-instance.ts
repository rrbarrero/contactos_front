import axios from "axios";
import { store } from "../store/store";


export const AxiosBr = () => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "not env defined",
    timeout: 5000,
    headers: {
        Authorization: "Bearer " + store.getState().authentication.token,
    }
});


