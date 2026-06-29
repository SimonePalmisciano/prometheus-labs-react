import { useState, useEffect } from "react";
import "../styles/NewsletterPopup.css";

// Popup newsletter mostrato solo alla prima visita
function NewsletterPopup() {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Controlla se l'utente ha già visto il popup
        const alreadySeen = localStorage.getItem("newsletterSeen");
        if (!alreadySeen) {
            setVisible(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("newsletterSeen", "true");
        setVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:3000/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            setSubmitted(true);
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            console.error("Errore invio newsletter:", error);
        }
    };

    if (!visible) return null;

    return (
        <div className="newsletter-overlay">
            <div className="newsletter-popup">

                {/* Bottone chiudi */}
                <button className="newsletter-close" onClick={handleClose}>✕</button>

                {!submitted ? (
                    <>
                        <h2>Welcome to Prometheus Labs!</h2>
                        <p>Subscribe to our newsletter and be the first to know about new superpowers.</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </>
                ) : (
                    <div>
                        <h2>Thank you!</h2>
                        <p>You have successfully subscribed to our newsletter.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default NewsletterPopup;