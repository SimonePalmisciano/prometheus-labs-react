import { useState, useEffect } from "react";
import "../styles/CheckoutPage.css";
import { useCart } from "../contexts/CartContext";
import validateCheckout from "../utils/validateCheckout";

export default function CheckoutPage() {
    const [billing, setBilling] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        house_number: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    });

    const [shipping, setShipping] = useState({
        address: "",
        house_number: "",
        city: "",
        postalCode: "",
        country: ""
    });

    const [card, setCard] = useState({
        number: "",
        expiry: "",
        cvv: ""
    });

    const { cartItems, cartTotal } = useCart();

    const [paymentStatus, setPaymentStatus] = useState(null);

    const [errors, setErrors] = useState({});

    const orderPayload = {
        guest_email: billing.email,
        guest_name: billing.firstName,
        guest_surname: billing.lastName,
        phone_number: billing.phone,
        city: shipping.city,
        address: shipping.address,
        house_number: "1",
        postal_code: shipping.postalCode,
        country: shipping.country,
        items: cartItems.map(item => ({
            id: item.id,
            slug: item.slug,
            quantity: item.quantity
        }))
    };

    const sendOrder = async () => {
        try {
            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            const data = await res.json();
            console.log("Order created:", data);
        } catch (error) {
            console.error("Error sending order:", error);
        }
    };

    const handlePayment = () => {
        const newErrors = validateCheckout(billing, shipping, card);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const cleanNumber = card.number.replace(/\s/g, "");
        if (cleanNumber === "4242424242424242") {
            setPaymentStatus("success");
            sendOrder();
        } else {
            setPaymentStatus("error");
        }
    };



    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            {/* BILLING */}
            <section className="checkout-section">
                <h2>Billing Details</h2>

                <div className="checkout-form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={billing.firstName}
                        onChange={(e) => setBilling({ ...billing, firstName: e.target.value })}
                    />
                    {errors.firstName && <p className="text-danger small">{errors.firstName}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={billing.lastName}
                        onChange={(e) => setBilling({ ...billing, lastName: e.target.value })}
                    />
                   {errors.lastName && <p className="text-danger small">{errors.lastName}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={billing.email}
                        onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                    />
                   {errors.email && <p className="text-danger small">{errors.email}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={billing.address}
                        onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                    />
                   {errors.billingAddress && <p className="text-danger small">{errors.billingAddress}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>House Number</label>
                    <input
                        type="text"
                        value={billing.house_number}
                        onChange={(e) => setBilling({ ...billing, house_number: e.target.value })}
                    />
                    {errors.billingHouseNumber && <p className="text-danger small">{errors.billingHouseNumber}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>City</label>
                    <input
                        type="text"
                        value={billing.city}
                        onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                    />
                   {errors.billingCity && <p className="text-danger small">{errors.billingCity}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        value={billing.postalCode}
                        onChange={(e) => setBilling({ ...billing, postalCode: e.target.value })}
                    />
                    {errors.billingPostalCode && <p className="text-danger small">{errors.billingPostalCode}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={billing.country}
                        onChange={(e) => setBilling({ ...billing, country: e.target.value })}
                    />
                 {errors.billingCountry && <p className="text-danger small">{errors.billingCountry}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={billing.phone}
                        onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-danger small">{errors.phone}</p>}
                </div>
            </section>

            {/* SHIPPING */}
            <section className="checkout-section">
                <h2>Shipping Details</h2>

                <div className="checkout-form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    />
                    {errors.shippingAddress && <p className="text-danger small">{errors.shippingAddress}</p>}
                </div>
                <div className="checkout-form-group">
                    <label>House Number</label>
                    <input
                        type="text"
                        value={shipping.house_number}
                        onChange={(e) => setShipping({ ...shipping, house_number: e.target.value })}
                    />
                   {errors.shippingHouseNumber && <p className="text-danger small">{errors.shippingHouseNumber}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>City</label>
                    <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    />
                   {errors.shippingCity && <p className="text-danger small">{errors.shippingCity}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        value={shipping.postalCode}
                        onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                    />
                   {errors.shippingPostalCode && <p className="text-danger small">{errors.shippingPostalCode}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={shipping.country}
                        onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    />
                    {errors.shippingCountry && <p className="text-danger small">{errors.shippingCountry}</p>}
                </div>
            </section>

            {/* ORDER SUMMARY */}
            <section className="checkout-section">
                <h2>Order Summary</h2>

                {cartItems.length === 0 && <p>The cart is empty.</p>}

                {cartItems.map(item => (
                    <div key={item.slug} className="checkout-summary-item">
                        <span>{item.name} x{item.quantity}</span>
                        <span>€{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                ))}

                <h3 className="checkout-summary-total">Total: €{cartTotal}</h3>


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
                    {errors.cardNumber && <p className="text-danger small">{errors.cardNumber}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>Expiry (MM/YY)</label>
                    <input
                        type="text"
                        placeholder="12/28"
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    />
                    {errors.expiry && <p className="text-danger small">{errors.expiry}</p>}
                </div>

                <div className="checkout-form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        placeholder="123"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    />
                    {errors.cvv && <p className="text-danger small">{errors.cvv}</p>}
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