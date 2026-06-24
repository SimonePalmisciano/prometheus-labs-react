import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import "../../styles/ProductsPage.css";
import ProductCard from "../../components/Main/ProductCard.jsx";
import { useCart } from "../../contexts/CartContext.jsx";


export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3000/products");
                const data = await res.json();

                setProducts(data.results);
                setFiltered(data.results);
            } catch (error) {
                console.error("Errore nel caricamento prodotti:", error);
            }
        };

        fetchProducts();
    }, []);

    const categories = [
        ...new Set(
            products.flatMap(p => p.categories)
        )
    ];


    const filterByCategory = (value) => {
        setCategory(value);

        if (value === "") {
            setFiltered(products);
            return;
        }

        if (value === "bestseller") {
            setFiltered(products.filter(p => p.bestseller === 1 || p.bestseller === true));
            return;
        }

        setFiltered(products.filter(p => p.categories.includes(value)));

    };

    const sortByPrice = (value) => {
        setSort(value);

        let sorted = [...filtered];

        if (value === "min") sorted.sort((a, b) => a.price - b.price);
        if (value === "max") sorted.sort((a, b) => b.price - a.price);

        setFiltered(sorted);
    };

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
        <main className="container products-page">
            <h1 className="text-center mb-4">Products</h1>

            {/* FILTERS */}
            <section className="d-flex justify-content-center gap-3 mb-2 products-filters">

                {/* CATEGORY SELECT  */}
                <select
                    value={category}
                    onChange={(e) => filterByCategory(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">All</option>

                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}

                    <option value="bestseller">Bestseller</option>
                </select>


                {/* SORT SELECT */}
                <select
                    value={sort}
                    onChange={(e) => sortByPrice(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">Sort by price</option>
                    <option value="min">Prezzo MIN</option>
                    <option value="max">Prezzo MAX</option>
                </select>
            </section>
            <section>
                <button className='btn  mb-2 fw-bold fs-3 text-primary-emphasis'><Link to="/home">Home</Link></button>
            </section>

            {/* PRODUCT LIST */}
            <section className="row g-4">
                {filtered.map(product => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-4">

                        <div className="product-wrapper">

                            <ProductCard product={product} />

                        </div>

                    </div>
                ))}
            </section>


        </main>
    );
}
