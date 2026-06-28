import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

import "../../styles/ProductsPage.css";
import styles from "../../components/Main/ProductCard.module.css";

import ProductCard from "../../components/Main/ProductCard.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import api from "../../services/api.js";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);


    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "";
    const sort = searchParams.get("sort") ?? "";

    const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

    function setParam(key, value) {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, value); else next.delete(key);
            return next;
        });
    }

    const { addToCart } = useCart();

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productsError, setProductsError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoadingProducts(true);
                setProductsError("");

                const query = searchParams.toString();
                const results = await api.getProducts(query);

                setProducts(results || []);
            } catch (error) {
                console.error("Error loading products:", error);
                setProductsError(error.message || "Error loading products");
            } finally {
                setLoadingProducts(false);
            }
        }

        fetchProducts();
    }, [searchParams]);

    const categories = useMemo(() => {
        return [...new Set(products.flatMap((product) => product.categories || []))];
    }, [products]);

    const visibleProducts = useMemo(() => {
        let list = [...products];

        if (category === "bestseller") {
            list = list.filter(
                (product) =>
                    Array.isArray(product.categories) &&
                    product.categories.includes("bestseller")
            );
        } else if (category !== "") {
            list = list.filter(
                (product) =>
                    Array.isArray(product.categories) &&
                    product.categories.includes(category)
            );
        }

        if (sort === "min") {
            list.sort((a, b) => Number(a.price) - Number(b.price));
        }

        if (sort === "max") {
            list.sort((a, b) => Number(b.price) - Number(a.price));
        }

        return list;
    }, [products, category, sort]);

    function handleAddToCart(event, product) {
        event.preventDefault();
        event.stopPropagation();

        addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.imgMain,
        });
    }

    return (
        <main className="container products-page">
            <h1 className="text-center mb-4">Products</h1>

            <section className="d-flex justify-content-center align-items-end gap-5 mb-4 products-filters">

                <div className="d-flex flex-column">
                    <label className="form-label">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setParam("category", e.target.value)}
                        className="form-select"
                    >
                        <option value="">All</option>

                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=" d-flex gap-1">
                    <div className="d-flex flex-column">
                        <label className="form-label">Search</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={searchInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchInput(value);
                                if (value.trim() === "") {
                                    setParam("search", "");
                                }
                            }}
                        />

                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label opacity-0">Search</label>
                        <button
                            className="btn btn-primary"
                            onClick={() => setParam("search", searchInput.trim())}
                        >
                            Search
                        </button>

                    </div>


                </div>

                <div className="d-flex flex-column">
                    <label className="form-label">Sort</label>
                    <select
                        value={sort}
                        onChange={(e) => setParam("sort", e.target.value)}
                        className="form-select"
                    >
                        <option value="">Sort by price</option>
                        <option value="min">Price MIN</option>
                        <option value="max">Price MAX</option>
                    </select>
                </div>


            </section>

            {loadingProducts && <p>Products Loading...</p>}

            {productsError && <p className="text-danger text-center my-5 fs-5">`No products found with name "{search}"`</p>}

            {!loadingProducts && !productsError && visibleProducts.length === 0 && (
                <p>{search ? `No products found with name "${search}"` : "No products to be shown"}</p>
            )}

            {!loadingProducts && !productsError && (
                <section className="row g-4 mt-2 mb-5">
                    {visibleProducts.map((product) => (
                        <div key={product.id} className="col-12 col-lg-4">
                            <div className="product-wrapper">
                                <ProductCard
                                    product={product}
                                    className={`${styles.productCard}`}
                                />
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}
