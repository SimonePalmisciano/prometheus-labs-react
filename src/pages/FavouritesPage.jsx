import useFavourites from "../hooks/useFavourites"
import ProductCard from "../components/Main/ProductCard";

function FavouritesPage() {
    const { favourites } = useFavourites();

    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {favourites.length === 0 && <div className="alert alert-warning w-100 text-center">non sono presenti prodotti...</div>}
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