import { useState, useEffect } from "react";
import "../styles/CheckoutPage.css"

export default function CheckoutPage() {
    const [billing, setBilling] = useState({
        nome: "",
        cognome: "",
        email: "",
        indirizzo: "",
        citta: "",
        cap: "",
        paese: "",
        telefono: ""
    });

    const [shipping, setShipping] = useState({
        indirizzo: "",
        citta: "",
        cap: "",
        paese: ""
    });

    const [card, setCard] = useState({
        number: "",
        expiry: "",
        cvv: ""
    });

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState(null);


    const handlePayment = () => {
        const cleanNumber = card.number.replace(/\s/g, "");

        if (cleanNumber === "4242424242424242") {
            setPaymentStatus("success");
        } else if (cleanNumber === "4000000000000002") {
            setPaymentStatus("error");
        } else {
            setPaymentStatus("error");
        }
    };


    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);

        const sum = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(sum);
    }, []);

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {/* BILLING */}
            <section className="checkout-section">
                <h2>Billing Details</h2>

                <div className="checkout-form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={billing.nome}
                        onChange={(e) => setBilling({ ...billing, nome: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Surname</label>
                    <input
                        type="text"
                        value={billing.cognome}
                        onChange={(e) => setBilling({ ...billing, cognome: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={billing.email}
                        onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={billing.indirizzo}
                        onChange={(e) => setBilling({ ...billing, indirizzo: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>City</label>
                    <input
                        type="text"
                        value={billing.citta}
                        onChange={(e) => setBilling({ ...billing, citta: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>CAP</label>
                    <input
                        type="text"
                        value={billing.cap}
                        onChange={(e) => setBilling({ ...billing, cap: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={billing.paese}
                        onChange={(e) => setBilling({ ...billing, paese: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={billing.telefono}
                        onChange={(e) => setBilling({ ...billing, telefono: e.target.value })}
                    />
                </div>
            </section>

            {/* SHIPPING */}
            <section className="checkout-section">
                <h2>Shipping Details</h2>

                <div className="checkout-form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={shipping.indirizzo}
                        onChange={(e) => setShipping({ ...shipping, indirizzo: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>City</label>
                    <input
                        type="text"
                        value={shipping.citta}
                        onChange={(e) => setShipping({ ...shipping, citta: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>CAP</label>
                    <input
                        type="text"
                        value={shipping.cap}
                        onChange={(e) => setShipping({ ...shipping, cap: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={shipping.paese}
                        onChange={(e) => setShipping({ ...shipping, paese: e.target.value })}
                    />
                </div>
            </section>


            {/* ORDER SUMMARY*/}
            <section className="checkout-section">
                <h2>Order Summary</h2>

                {cart.length === 0 && <p>The cart is empty.</p>}

                {cart.map((item) => (
                    <div key={item.id} className="checkout-summary-item">
                        <span>{item.title}</span>
                        <span>{item.quantity} × €{item.price}</span>
                    </div>
                ))}

                <h3 className="checkout-summary-total">Total: €{total}</h3>
            </section>



            {/* PAYMENT */}
            <section className="checkout-section">
                <h2>Payment</h2>

                <div className="checkout-form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>Expiry (MM/YY)</label>
                    <input
                        type="text"
                        placeholder="12/28"
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    />
                </div>

                <div className="checkout-form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        placeholder="123"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    />
                </div>

                <button className="checkout-submit-btn" onClick={handlePayment}>
                    Pay Now
                </button>

                {paymentStatus === "success" && (
                    <div className="checkout-payment-message success">
                        Payment approved! 🎉
                    </div>
                )}

                {paymentStatus === "error" && (
                    <div className="checkout-payment-message error">
                        Payment denied. Try again with another card.
                    </div>
                )}
            </section>


        </div>
    );
}
