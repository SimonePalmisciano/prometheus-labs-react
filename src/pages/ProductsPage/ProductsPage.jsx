import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import "../../styles/ProductsPage.css";
import styles from "../../components/Main/ProductCard.module.css";

import ProductCard from "../../components/Main/ProductCard.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import api from "../../services/api.js";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    // Multi-query states
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const { addToCart } = useCart();

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productsError, setProductsError] = useState("");

    // Build query string dynamically
    function buildQueryString() {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (sort) params.append("sort", sort);

        return params.toString();
    }

    // Fetch products with multi-query
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoadingProducts(true);
                setProductsError("");

                const query = buildQueryString();
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
    }, [search, category, sort]);

    // Extract categories
    const categories = useMemo(() => {
        return [...new Set(products.flatMap((product) => product.categories || []))];
    }, [products]);

    // Sorting + filtering (client-side)
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

            {/* Filters */}
            <section className="d-flex justify-content-center gap-3 mb-2 products-filters">

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">All</option>

                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Search */}
                <input
                    type="text"
                    className="form-control w-auto"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">Sort by price</option>
                    <option value="min">Price MIN</option>
                    <option value="max">Price MAX</option>
                </select>
            </section>

            {loadingProducts && <p>Products Loading...</p>}

            {productsError && <p className="text-danger">{productsError}</p>}

            {!loadingProducts && !productsError && visibleProducts.length === 0 && (
                <p>No products to be shown</p>
            )}

            {!loadingProducts && !productsError && (
                <section className="row g-4 mt-2">
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
