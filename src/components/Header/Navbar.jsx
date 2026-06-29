import React, { useState } from "react";
import "../../styles/Navbar.css";
import { FiSearch, FiHeart, FiShoppingCart, FiGlobe, FiSun, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useFavourites } from "../../contexts/FavouritesContext";
import { useCart } from "../../contexts/CartContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [navSearch, setNavSearch] = useState("");
    const { favourites } = useFavourites();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    function handleNavSearch(e) {
        if (e.key === "Enter" && navSearch.trim()) {
            navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
        }
    }

    return (
        <header className="nav">
            <div className="logo">
                <Link to="/"><img src="/logo/logo.png" alt="logo" /></Link>

            </div>

            <div className="mobile-top-icons">

                <Link to={"/favourites"}>
                    <span className="icon-wrapper">
                        <FiHeart className="icon-btn" />
                        {favourites.length > 0 && <span className="icon-badge">{favourites.length}</span>}
                    </span>
                </Link>
                <Link to={"/cart"}>
                    <span className="icon-wrapper">
                        <FiShoppingCart className="icon-btn" />
                        {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
                    </span>
                </Link>
            </div>

            <nav className="nav-center">
                <Link to="/products">Products</Link>
                <Link>About Us</Link>
                <Link>Contact</Link>
            </nav>

            <div className="nav-right">
                <div className="search-box ">
                    <FiSearch className="icon" />
                    <input
                        placeholder="Search powers..."
                        value={navSearch}
                        onChange={(e) => setNavSearch(e.target.value)}
                        onKeyDown={handleNavSearch}
                    />
                </div>

                <Link to={"/favourites"}>
                    <span className="icon-wrapper">
                        <FiHeart className="icon-btn" />
                        {favourites.length > 0 && <span className="icon-badge">{favourites.length}</span>}
                    </span>
                </Link>
                <Link to={"/cart"}>
                    <span className="icon-wrapper">
                        <FiShoppingCart className="icon-btn" />
                        {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
                    </span>
                </Link>
                {
                    /* COMMENTATI FINO A QUANDO NON HANNO UN'UTILITA'
                    <FiGlobe className="icon-btn " />
                    <FiSun className="icon-btn" /> 
                    */
                }
            </div>

            <div className="hamburger" onClick={() => setOpen(!open)}>
                {open ? <FiX /> : <FiMenu />}
            </div>

            <div className={`mobile-menu ${open ? "open" : ""}`}>
                <Link to="/products">Products</Link>
                <Link to="">About Us</Link>
                <Link to="">Contact</Link>
            </div>
        </header>
    );
};

export default Navbar;
