import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import api from "../services/api.js";
import "../styles/ProductDetail.css";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import useFavourites from "../hooks/useFavourites.js";
import { useCart } from "../contexts/CartContext.jsx";
import {utils, API_URL} from "../utils/utils.js";

const CATEGORY_TEMPLATES = {
    dailysuper: "/images/gallery-template-dailysuper.png",
    powershot: "/images/gallery-template-powershot.png",
    novamorph: "/images/gallery-template-novamorph.png",
};
const COMMON_TEMPLATE = "/images/gallery-template-common.png";

function resolveImageSrc(image) {
    return image.isStatic ? image.src : `${API_URL}${image.src}`;
}

function ProductDetail() {
    const { slug } = useParams();
    const { isFavourite, toggleFavourite } = useFavourites();
    const favourite = isFavourite(slug);
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const { addToCart, isInCart, getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
    const quantityInCart = getItemQuantity(slug);
    const productAlreadyInCart = isInCart(slug);



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.getProductBySlug(slug);

                if (!response || response.length === 0) {
                    setError(`Product with slug ${slug} not found`);
                    return;
                }

                const prod = response[0];
                setProduct(prod);

                fetchRelated(prod.categories[0]);

            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [slug]);


    useEffect(() => {
        if (product?.imgMain) setMainImage(`${API_URL}${product.imgMain}`);
    }, [product?.imgMain]);

    // fetch dei prodotti nel carousel 'frequently bought together'
    async function fetchRelated(category) {
        try {
            const res = await api.getProductsByCategory(category);
            // shuffle dei risultati + selezione 5 da lista shuffled
            const resFinal = res.sort(utils.getRandomOrder).slice(0,4);

            setRelated(resFinal);
        } catch (err) {
            console.error("Related errors:", err);
        }
    }

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

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error || !product) return <Navigate to="/404" replace />;

    const categoryTemplate = CATEGORY_TEMPLATES[product.categories?.[0]];
    const galleryImages = [
        { src: product.imgMain, isStatic: false },
        categoryTemplate ? { src: categoryTemplate, isStatic: true } : null,
        { src: COMMON_TEMPLATE, isStatic: true },
    ].filter(Boolean);

    return (
        <div className="container my-4 product-detail-container">

            <div className="row">

                {/* LEFT SIDE: Thumbnail Column + Main Image */}
                <div className="col-md-6 space-part-mobile">
                    <div className="row">

                        {/* Thumbnails */}
                        <div className="col-2 d-flex flex-column gap-3">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail-wrapper ${mainImage === resolveImageSrc(image) ? "selected" : ""}`}
                                    onClick={() => setMainImage(resolveImageSrc(image))}
                                >
                                    <img
                                        src={resolveImageSrc(image)}
                                        alt={`${product.name} view ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="col-10">
                            <div className="card product-image-card border-0 h-100 d-flex justify-content-center align-items-center">
                                <img
                                    src={mainImage || null} // inserendo null invece di stringa vuota si evita richiesta di rete fantasma
                                    className="main-gallery-img"
                                    alt={product.name}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE DETAILS */}
                <div className="col-md-6">
                    <div className="card product-info-card">
                        <div className="card-body">
                            <div className=" d-flex justify-content-between">
                                <h1 className="card-title ">{product.name}</h1>
                                <button
                                    className="btn bg-jurassik-orange"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        toggleFavourite(product);
                                    }}
                                >
                                    {favourite ? <FaHeart className="icon-btn icon-btn--active" /> : <FiHeart className="icon-btn" />}
                                </button>
                            </div>


                            <p className="card-text ">
                                {expanded
                                    ? product.mktgDescription
                                    : product.mktgDescription.slice(0, 150) + "..."
                                }
                            </p>
                            <div>
                                <button
                                    className="readBtn"
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "Show less ▲" : "Read more ▼"}
                                </button>
                            </div>

                            <hr className="border-secondary" />

                            <h5>
                                <span >€ {product.price}</span>
                            </h5>

                            <h5 className="mt-3">Ingredients:</h5>
                            <p>{product.ingredients}</p>

                            {!quantityInCart ?
                                <button
                                    className="btn  add-to-cart-btn"
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
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

            {/* RELATED PRODUCTS */}
            <div className="mt-5 mb-5">
                <h3 className=" m-5 look-mobile">Also Worth a Look</h3>

                <div className="row">
                    {related
                        .filter((item) => item.slug !== product.slug)
                        .map((item) => (
                            <div key={item.slug} className="card-wrapper col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                <Link
                                    to={`/products/${item.slug}`}
                                    className="text-decoration-none"
                                >
                                    <div className="look-card">
                                        <img
                                            src={`${API_URL}${item.imgMain}`}
                                            className="card-img-top"
                                            alt={item.name}
                                        />
                                        <div className="card-body text-nowrap">
                                            <h5 className="look-card-title mt-4">{item.name}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

