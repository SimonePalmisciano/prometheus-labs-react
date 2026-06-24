import { useCart } from "../../contexts/CartContext.jsx";

function CartItemCard({ item }) {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    return (
        <div className="card mb-3">
            <div className="row g-0 align-items-center">
                <div className="col-4 col-md-2">
                    <img
                        src={`http://localhost:3000${item.image}`}
                        className="img-fluid rounded-start"
                        alt={item.name}
                    />
                </div>

                <div className="col-8 col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text mb-1">Prezzo: € {item.price}</p>
                        <p className="card-text mb-1">Quantità: {item.quantity}</p>
                        <p className="card-text fw-bold">
                            Subtotale: € {(item.price * item.quantity).toFixed(2)}
                        </p>

                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => decreaseQuantity(item.slug)}
                            >
                                -
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => increaseQuantity(item.slug)}
                            >
                                +
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() => removeFromCart(item.slug)}
                            >
                                Rimuovi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItemCard;