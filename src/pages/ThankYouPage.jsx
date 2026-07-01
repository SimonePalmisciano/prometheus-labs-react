import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function ThankYouPage() {
    const navigate = useNavigate();
    const [secondi, setSecondi] = useState(15);

    useEffect(() => {
        // ogni secondo aggiorno il conto alla rovescia
        const intervallo = setInterval(() => {
            setSecondi(prev => prev - 1);
        }, 1000);

        // dopo 15 secondi reindirizzo alla home
        const timeout = setTimeout(() => {
            navigate("/");
        }, 15000);

        // pulizia: cancello timer e intervallo se l'utente naviga prima
        return () => {
            clearInterval(intervallo);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="text-center py-5" style={{ minHeight: "70vh" }}>
            <i className="bi bi-check-circle-fill" style={{ fontSize: "4rem", color: "#E8820C" }}></i>
            <h1 className="mt-4" style={{ color: "#fff" }}>Thank you for your order!</h1>
            <p className="text-muted mt-2">
                You will receive a confirmation email shortly.
            </p>
            <p className="text-muted">
                You will be redirected to the home page in {secondi} seconds...
            </p>
            <Link to="/" style={{ backgroundColor: "#E8820C", border: "none" }} className="btn mt-4">
                Back to Home
            </Link>
        </div>
    );
}

export default ThankYouPage;