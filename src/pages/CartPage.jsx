import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/Main/ProductCard";
import { Link } from "react-router";
import CartItemCard from "../components/Main/CartItemCard";

function CartPage() {
    const { cartItems, cartCount, clearCart, cartTotal } = useCart();

    return (
        <div className="container py-4">
            <div className="my-3">
                <h1>CART</h1>
            </div>
            <h4 className="my-2">ITEMS IN THE CART ({cartCount})</h4>

            <div className="text-end my-2">
                <button className="btn btn-primary" onClick={clearCart}>
                    CLEAR CART
                </button>
            </div>
            {cartItems.length === 0 && <div className="container text-center">
                <div className="alert alert-warning w-100 text-center">non sono presenti prodotti...</div>
                <Link to="/">
                    <button className='btn btn-warning'>go back to HomePage'</button>
                </Link>
            </div>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {cartItems.map((item) => (
                    <div className="col" key={item.slug}>
                        <CartItemCard item={item} />
                    </div>
                ))}
            </div>
            <div className="text-start">
                <h5>TOTAL PRICE: € {cartTotal}</h5>
            </div>
        </div>
    )
}
export default CartPage