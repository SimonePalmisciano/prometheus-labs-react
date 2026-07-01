import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/Cards/ProductCard.jsx";
import { Link } from "react-router";
import CartItemCard from "../components/Cards/CartItemCard.jsx";

function CartPage() {
    const { cartItems, cartCount, clearCart, cartTotal } = useCart();
    const isCartEmpty = !cartItems || cartItems.length === 0;

    return (
        <div className="container py-4">
            <div className="my-3">
                <h1>CART</h1>
            </div>
            <h4 className="my-2">ITEMS IN THE CART ({cartCount})</h4>

            <div className="text-end my-2">
                <button className="btn clearCartBtn" onClick={clearCart}>
                    CLEAR CART
                </button>
            </div>
            {cartItems.length === 0 && <div className="container text-center">
                <div className="alert bg-purlpler w-100 py-4">No products added to cart yet!</div>
                <Link to="/">
                    <button className='btn btnHome mt-3'>Go to Homepage</button>
                </Link>
            </div>}
            <div className="row flex-column g-4">
                {cartItems.map((item) => (
                    <div className="col-8" key={item.slug}>
                        <CartItemCard item={item} />
                    </div>
                ))}
            </div>
            {cartItems.length > 0 && (
                <div className="col-8 mb-4 card p-3 bg-white">
                    <h6 className="text-uppercase fw-bold text-dark border-bottom pb-2 mb-3 fs-6 style-font-futuristic">
                        ITEMS BREAKDOWN
                    </h6>
                    {cartItems.map((item) => (
                        <div key={`summary-${item.slug}`} className="d-flex justify-content-between align-items-center mb-2 small">
                            <div>
                                <span className="font-monospace text-muted"> {item.name} </span>
                                <span className="ms-2 text-dark fw-medium">× {item.quantity}</span>
                            </div>
                            <span className="fw-bold text-dark">
                                € {(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            <div className="text-start mt-5">
                <h5>TOTAL PRICE: € {cartTotal}</h5>
            </div>
            <div className="py-5">
                <Link to="/checkout"
                    onClick={(e) => isCartEmpty && e.preventDefault()}
                    className={isCartEmpty ? "pointer-events-none" : ""}>
                    <button className="clearCartBtn btn" disabled={isCartEmpty}>Checkout</button>
                </Link>
            </div>

        </div>
    )
}
export default CartPage;