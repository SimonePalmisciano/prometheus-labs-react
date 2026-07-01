import { Link } from "react-router";
import useFavourites from "../hooks/useFavourites.js";
import ProductCard from "../components/Cards/ProductCard";
import "../styles/FavoritesPage.css";

function FavouritesPage() {
    const { favourites } = useFavourites();

    return (
        <div className="container py-4">

            <div className="title my-3">
                <h1>Your Favourites ({favourites.length})</h1>
                {favourites.length === 0 && <div className="container text-center">
                    <div className="alert text-center bg-purlpler">You don't have any favorites saved yet!</div>
                    <Link to="/">
                        <button className={`btn btnHome`}>go back to HomePage'</button>
                    </Link>
                </div>}
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {favourites.map((favourites) => (
                    <div className="col" key={favourites.slug}>
                        <ProductCard product={favourites} />
                    </div>
                ))};
            </div>
        </div>
    )
        ;
}

export default FavouritesPage;