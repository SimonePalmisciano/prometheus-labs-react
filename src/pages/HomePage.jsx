import { useState, useEffect } from "react";
import Herosection from "../components/Main/HeroSection.jsx";
import ProductCollection from "../components/Main/ProductCollection.jsx";
import api from "../services/api.js";

function HomePage() {
// stato per memozizare prodotti
const [ products, setProducts ] = useState([]);
// stato per gestione errore
const [ error, setError ] = useState(null);
// useEffect per fetch 

useEffect(() => {
    async function fetchMyData() {
        try {
            const results = await api.getProducts();
            setProducts(results);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    fetchMyData();

}, []);

    return <>
            <Herosection />
            {error && <p style={{ color: "red" }}>{error}</p>}
            { products.length > 0 ?
            (<p>{JSON.stringify(products)}</p>) : (<p>caricamento in corso...</p>)
            }
            <ProductCollection />
        </>
    }


export default HomePage