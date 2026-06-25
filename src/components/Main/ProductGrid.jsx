import { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import api from "../../services/api.js";
import styles from "./ProductCard.module.css";


function ProductGrid({ title, products, lastProduct }) {
    return <>
        <div className="mb-5 row-gap-3">
            <h2 className="mb-4">{title}</h2>
            <div className="row row-cols-md-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} className={`${styles.productCard} ${styles.productMain}`}/>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                {lastProduct && <ProductCard key={lastProduct.id} product={lastProduct} className={`${styles.productCard} ${styles.productLast}`}/>}
            </div>
        </div>
    </>

}
export default ProductGrid;