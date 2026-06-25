import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/Main/ProductCard";
import { Link } from "react-router";
import CartItemCard from "../components/Main/CartItemCard";

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
                <button className="btn btn-danger" onClick={clearCart}>
                    CLEAR CART
                </button>
            </div>
            {cartItems.length === 0 && <div className="container text-center">
                <div className="alert alert-warning w-100 text-center">No products added to cart!</div>
                <Link to="/">
                    <button className='btn btn-warning'>Go to Homepage</button>
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
            <div className="py-5">
                <Link to="/checkout"
                onClick={(e) => isCartEmpty && e.preventDefault()} 
                className={isCartEmpty ? "pointer-events-none" : ""}>
                    <button className='btn btn-warning'disabled={isCartEmpty}>Checkout</button>
                </Link>
            </div>
            
        </div>
    )
}
export default CartPage;