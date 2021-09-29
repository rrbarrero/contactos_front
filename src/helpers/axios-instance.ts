import axios from "axios"

export const AxiosBr = (token: string | undefined) => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "not env defined",
    timeout: 5000,
    headers: {
        Authorization: "Bearer " + token,
    }
});


