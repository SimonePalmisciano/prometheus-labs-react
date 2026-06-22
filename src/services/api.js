const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || '3000';
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'localhost';
const API_BASE_URL = `http://${SERVER_URL}:${SERVER_PORT}`;

const api = {
    async getProducts() {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Errore nel caricamento dei dati");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    }
}

export default api;