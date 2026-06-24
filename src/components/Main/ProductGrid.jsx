import { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import api from "../../services/api.js";

function ProductGrid({ title, products }) {
    return <>
        <div className="mb-5">
            <h2 className="mb-4">{title}</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(product => (
                    <ProductCard key={product.id} prodotto={product} />
                ))}
            </div>
        </div>
    </>

}
export default ProductGrid;