import { useState } from "react";
import { Link } from "react-router";
import styles from "./ProductCard.module.css";

// Componente card singolo product
function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="col-12 col-md-12 col-lg">
      <div className={`card h-100 ${styles.prodCard}`}>
        <Link to={`/products/${product.slug}`}>
          <img
            src={`http://localhost:3000${product.imgMain}`}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            {expanded
              ? product.shortDescription
              : product.shortDescription.slice(0, 50) + "..."
            }
          </p>
          <button
            className="btn btn-link text-primary p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less ▲" : "Read more ▼"}
          </button>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="fw-bold">€ {product.price}</span>
          <i className="bi bi-cart3"></i>
        </div>
      </div>
    </div>
  )
}

export default ProductCard