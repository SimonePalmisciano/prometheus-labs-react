import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router";
import api from "../../services/api.js";
import styles from "./ProductDetail.module.css";


const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || '3000';
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'localhost';
const API_BASE_URL = `http://${SERVER_URL}:${SERVER_PORT}`;

function ProductDetail() {
    const { slug } = useParams(); // prende lo slug
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    

    useEffect(() => {
        async function fetchMyData() {
            try {
                const response = await api.getProductBySlug(slug);
                setProduct(response[0]);
                console.log(response[0]);

            } catch (error) {
                console.error(error);
                setError(error);
            }
        }
        fetchMyData();


    }, [slug]);

    return <>
        <div className="container my-4">
            <div className="btn-link mb-4 d-flex">
                <Link to="/" className="btn btn-primary">
                    ← Back to HomePage
                </Link>
            </div>
            <div className={`row ${styles.productCard}`}>
                <div className="col-md-6">
                    <div className="card text-light border-primary">
                        <img
                            src={product.imgMain ? `${API_BASE_URL}${product.imgMain}` : ""}
                            className="card-img-top rounded-1"
                            alt={product.name}
                        />
                    </div>
                </div>
                <div className="card-detail col-md-6">
                    <div className="card bg-dark text-light border-primary">
                        <div className="card-body">
                            <h1 className="card-title text-primary">{product.name}</h1>
                            <p className="card-text fs-5">{product.mktgDescription}</p>
                            <hr className="border-secondary" />
                            <h5>Price: <span className="text-primary">€ {product.price}</span></h5>
                            <h5 className="mt-3">Ingredients:</h5>
                            <p>{product.ingredients}</p>
                            <button
                                className="btn btn-primary mt-3 w-100"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default ProductDetail;