import { Link } from "react-router"
import useFavourites from "../../hooks/useFavourites";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import { FiSearch, FiHeart, FiShoppingCart, FiGlobe, FiSun, FiMenu, FiX } from "react-icons/fi";

// Componente card singolo prodotto
function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourite = isFavourite(prodotto.slug);

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

        <div className="card-footer d-flex gap-3">
          <span className="fw-bold me-auto">€ {product.price}</span>
          <button className="btn btn-dark bg-jurassik-orange"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleFavourite(prodotto);
            }}
          >
            {favourite ? <FiHeart className="icon-btn" /> : <FiHeart className="icon-btn" /> }
          </button>
          <FiShoppingCart className="icon-btn" />
           
        </div>
      </div>
    </div>
  )
}

export default ProductCard