import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("token");
    if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
});

export default api;