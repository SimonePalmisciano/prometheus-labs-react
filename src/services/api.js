const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || '3000';
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'localhost';
const API_BASE_URL = `http://${SERVER_URL}:${SERVER_PORT}`;

const api = {
    async getProducts(queryString = "") {
        const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
        if (!response.ok) throw new Error("Error occurred when loading data");
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    },

    async getProductBySlug(slug) {
        const response = await fetch(`${API_BASE_URL}/products/${slug}`);
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error)
        }
        return data.result;
    },

    async getLatestProducts() {
        const response = await fetch(`${API_BASE_URL}/products/latest`);
        if (!response.ok) throw new Error("Error occurred when loading data");
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    },

    async getBestsellerProducts() {
        const response = await fetch(`${API_BASE_URL}/products/bestsellers`);
        if (!response.ok) throw new Error("Error occurred when loading data");
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    },

    async getProductsByCategory(category) {
        const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
        if (!response.ok) throw new Error("Error occurred when loading data");
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    },


}

export default api;
