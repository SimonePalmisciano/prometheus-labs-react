import { Link } from "react-router";
import useFavourites from "../../hooks/useFavourites.js";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import { FiSearch, FiHeart, FiShoppingCart, FiGlobe, FiSun, FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext.jsx";





// Componente card singolo product
function ProductCard({ product, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourite = isFavourite(product.slug);
  const { addToCart, isInCart, getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
  const quantityInCart = getItemQuantity(product.slug);
  const productAlreadyInCart = isInCart(product.slug);

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

  function powerTypeCheck(powerType) {
    if (powerType === "physical") { return <div className={`badge my-auto p-2 m-3 ${styles.powTag} ${styles.phTag}`}>{product.power_type}</div> };
    if (powerType === "psychic") { return <div className={`badge my-auto p-2 m-3  ${styles.powTag} ${styles.psyTag}`}>{product.power_type}</div> };
  }

  return (
    <div className={`col-12 col-md-12 col-lg ${className}`}>
      <div className={`card h-100 `}>
        <Link to={`/products/${product.slug}`}>
          <img
            src={`http://localhost:3000${product.imgMain}`}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <div className={`${styles.cardBody}`}>
          <div className="card-title-container text-center">
            <h5 className={`card-title mb-0 fst-italic ${styles.cardTitle}`}>{product.name}</h5>
            <div className="px-3">
              <div className={`${styles.powerTitle}`}>{product.power}</div>
              {powerTypeCheck(product.power_type)}
            </div>
          </div>
          <div className="mt-0 pt-0">{product.categories.map((category) => {
            if (category === "bestseller") {
              return <span key={category} className={`${styles.bestseller}`}>{category}</span>
            } else { return <span key={category} className={`badge bg-secondary ${styles.productType}`}>{category}</span> }

            return
          })}</div>
          <p className="card-text">
            {expanded
              ? product.shortDescription
              : product.shortDescription.slice(0, 0) + ""
            }
          </p>
          {/* Readbtn rimosso
          
          <button
            className="readBtn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less ▲" : "Read more ▼"}
          </button> */}

        </div>

        <div className={`card-footer d-flex gap-3 justify-content-between ${styles.cardFooter}`}>

          <button className={`btn bg-jurassik-orange`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleFavourite(product);
            }}
          >
            {favourite ? <FaHeart className="icon-btn icon-btn--active" /> : <FiHeart className="icon-btn" />}
          </button>

          <div className={`d-flex align-items-center ${styles.priceBox}`}>
            <span className={`fw-bold me-auto ${styles.productPrice}`}>€ {product.price}</span>
            {!productAlreadyInCart ? <button
            className="btn bg-jurassik-orange"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="icon-btn" />
          </button>
            :
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => decreaseQuantity(product.slug)}
              >
                -
              </button>
              <div className="d-flex justify-content-center mx-2">
                {quantityInCart}
              </div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => increaseQuantity(product.slug)}
              >
                +
              </button>
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard