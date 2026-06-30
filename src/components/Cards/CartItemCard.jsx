import { useCart } from "../../contexts/CartContext.jsx";
import { API_URL } from "../../utils/utils.js";

function CartItemCard({ item }) {
    const { increaseQuantity, decreaseQuantity, removeFromCart, getItemQuantity } = useCart();
    const quantityInCart = getItemQuantity(item.slug);

    return (
        <div className="card mb-3">
            <div className="row g-0 align-items-center">
                <div className="col-4 col-md-4">
                    <img
                        src={`${API_URL}${item.image}`}
                        className="img-fluid rounded-start"
                        alt={item.name}
                    />
                </div>

                <div className="col-8 col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text mb-1">Price: € {item.price}</p>
                        <p className="card-text mb-1">Quantity: {item.quantity}</p>
                        <p className="card-text fw-bold">
                            Subtotal: € {(item.price * item.quantity).toFixed(2)}
                        </p>

                        <div className="d-flex gap-2 justify-content-between">
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => decreaseQuantity(item.slug)}
                                >
                                    -
                                </button>
                                <div className="d-flex justify-content-center mx-2">
                                    {quantityInCart}
                                </div>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => increaseQuantity(item.slug)}
                                >
                                    +
                                </button>
                            </div>

                            <div>
                                <button
                                    className="btn "
                                    onClick={() => removeFromCart(item.slug)}
                                >
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItemCard;