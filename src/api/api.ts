import axios from "axios";

const BASE_URL = "https://oxuaz.davidjs.dev";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    timeout: 10000,
});