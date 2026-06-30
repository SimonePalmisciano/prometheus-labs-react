const getRandomOrder = () => {
    return Math.random() - 0.5;
};

const URL = import.meta.env.SERVER_URL || "localhost";
const PORT = import.meta.env.SERVER_PORT || 3000;

const API_URL = `http://${URL}:${PORT}`;

const utils = {
    getRandomOrder,
    API_URL
};

export {
    utils,
    API_URL
};