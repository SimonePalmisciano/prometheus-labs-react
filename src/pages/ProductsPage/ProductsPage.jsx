import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import "../../styles/ProductsPage.css";
import ProductCard from "../../components/Main/ProductCard.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import api from "../../services/api.js";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchActive, setSearchActive] = useState(false);

    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const { addToCart } = useCart();

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productsError, setProductsError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoadingProducts(true);
                setProductsError("");

                const results = await api.getProducts();

                setProducts(results || []);
                
            } catch (error) {
                console.error("An error occured while loading products:", error);
                setProductsError(error.message || "An error occured while loading products");
            } finally {
                setLoadingProducts(false);
            }
        }

        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        return [...new Set(products.flatMap((product) => product.categories || []))];
    }, [products]);

    const visibleProducts = useMemo(() => {
        let list = searchActive ? [...searchResults] : [...products];

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
    }, [products, searchResults, searchActive, category, sort]);

    function handleSearchResults(results) {
        setSearchResults(results);
        setSearchActive(true);
    }

    function handleResetSearch() {
        setSearchResults([]);
        setSearchActive(false);
    }

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

            <section className="d-flex justify-content-center gap-3 mb-2 products-filters">
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

                <SearchBar
                    searchUrl={`${api.API_BASE_URL}/products`}
                    searchParam="search" //cambia questo in base a cosa cerca il backend
                    onResults={handleSearchResults}
                    onResetSearch={handleResetSearch}
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">Sort by price</option>
                    <option value="min">Prezzo MIN</option>
                    <option value="max">Prezzo MAX</option>
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
                                <ProductCard product={product} />
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}