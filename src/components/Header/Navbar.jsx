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
                {/* Links */}
                <div className="collapse navbar-collapse" id="menuNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/prodotti">Prodotti</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/carrello">Carrello</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar