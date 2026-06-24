import useFavourites from "../hooks/useFavourites"
import ProductCard from "../components/Main/ProductCard";
import { Link } from "react-router";

function FavouritesPage() {
    const { favourites } = useFavourites();

    return (
        <div className="container py-4">
            {favourites.length === 0 && <div className="container text-center">
                <div className="alert alert-warning w-100 text-center">You don't have any favorites saved yet!</div>
                <Link to="/">
                    <button className='btn btn-warning'>go back to HomePage'</button>
                </Link>
            </div>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {favourites.map((favourites) => (
                    <div className="col" key={favourites.slug}>
                        <ProductCard product={favourites} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default FavouritesPage