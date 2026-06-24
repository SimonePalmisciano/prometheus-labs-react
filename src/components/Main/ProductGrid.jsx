import { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import api from "../../services/api.js";

function ProductGrid({ title, products, lastProduct }) {
    return <>
        <div className="mb-5">
            <h2 className="mb-4">{title}</h2>
            <div className="row row-cols-md-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="w-50 d-flex justify-content-center">
                {lastProduct && <ProductCard key={lastProduct.id} product={lastProduct} />}
            </div>
        </div>
    </>

}
export default ProductGrid;