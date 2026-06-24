import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/Main/ProductCard";
import { Link } from "react-router";

function CartPage() {
    const { cartItems } = useCart();
    console.log(cartItems);
    

    return (
        <div className="container py-4">
            {cartItems.length === 0 && <div className="container text-center">
                <div className="alert alert-warning w-100 text-center">non sono presenti prodotti...</div>
                <Link to="/">
                    <button className='btn btn-warning'>go back to HomePage'</button>
                </Link>
            </div>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {cartItems.map((product) => (
                    <div className="col" key={product.slug}>
                        {/* inserire componente cartItemCard.jsx (ancora da creare) */}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CartPage