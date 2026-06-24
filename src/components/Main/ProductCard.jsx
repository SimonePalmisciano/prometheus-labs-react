import { Link } from "react-router";
import useFavourites from "../../hooks/useFavourites.js";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import { FiSearch, FiHeart, FiShoppingCart, FiGlobe, FiSun, FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext.jsx";

// Componente card singolo product
function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourite = isFavourite(product.slug);
  const { addToCart } = useCart();



  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.imgMain,
    });
  }

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
          <div className="card-title-container d-flex justify-content-between">
            <h5 className="card-title">{product.name}</h5>
            <div>{product.categories.map((category) => {
              if (category === "bestseller") { return <span key={category} className="badge bg-primary">{category}</span> }

              return
            })}</div></div>

          <p className="card-text">
            {expanded
              ? product.shortDescription
              : product.shortDescription.slice(0, 45) + "..."
            }
          </p>
          <button
            className="readBtn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less ▲" : "Read more ▼"}
          </button>
        </div>

        <div className="card-footer d-flex gap-3">
          <span className="fw-bold me-auto">€ {product.price}</span>
          <button className={`btn bg-jurassik-orange`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleFavourite(product);
            }}
          >
            {favourite ? <FaHeart className="icon-btn icon-btn--active" /> : <FiHeart className="icon-btn" />}
          </button>
          <button
            className="btn bg-jurassik-orange"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="icon-btn" />
          </button>
          {/* Badge categorie */}
          <div className="d-flex flex-wrap gap-1 mt-2">
            {product.categories.map((category) => {
              if (category === "bestseller") { return <span key={category} className="badge bg-primary">{category}</span> }

              return <span key={category} className="badge bg-secondary">{category}</span>
            })}
          </div>

          {/* Badge power */}
          <div className="d-flex flex-wrap gap-1 mt-1">
            <span className="badge bg-primary">{product.power}</span>
            <span className="badge bg-info">{product.power_type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard