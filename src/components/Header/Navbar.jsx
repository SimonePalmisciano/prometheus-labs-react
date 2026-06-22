import { Link } from "react-router";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand fw-bold" href="/">Prometheus Labs</a>
                {/* Bottone hamburger per mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Links + ricerca + carrello */}
                <div className="collapse navbar-collapse" id="menuNavbar">

                    {/* Links navigazione */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/products" className="nav-link" href="#">Products</Link>
                        </li>

                    </ul>

                    {/* Barra di ricerca */}
                    <form className="d-flex me-3">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Cerca..."
                        />
                    </form>

                    {/* Icona carrello */}
                    <a href="#" className="text-white fs-4">
                        <i className="bi bi-cart3"></i>
                    </a>

                </div>
            </div>
        </nav>
    )
}

export default Navbar