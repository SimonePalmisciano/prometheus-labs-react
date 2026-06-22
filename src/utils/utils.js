    const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || '3000';
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'localhost';
    const API_BASE_URL = `http://${SERVER_URL}:${SERVER_PORT}`;

    const utilsVariables = {
        SERVER_PORT,
        SERVER_URL,
        API_BASE_URL
    }

    export default utilsVariables;