import React, { useState } from "react";
import "../../styles/Navbar.css";
import { FiSearch, FiHeart, FiShoppingCart, FiGlobe, FiSun, FiMenu, FiX } from "react-icons/fi";
import { NavLink, Link, useNavigate } from "react-router";
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
                        <FiHeart className="icon-btn mt-1" />
                        {favourites.length > 0 && <span className="icon-badge">{favourites.length}</span>}
                    </span>
                </Link>
                <Link to={"/cart"}>
                    <span className="icon-wrapper">
                        <FiShoppingCart className="icon-btn mt-1" />
                        {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
                    </span>
                </Link>
            </div>



            <div className="nav-right">
                <nav className="nav-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        About Us
                    </NavLink>
                </nav>

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
                        <FiHeart className="icon-btn mt-1" />
                        {favourites.length > 0 && <span className="icon-badge">{favourites.length}</span>}
                    </span>
                </Link>
                <Link to={"/cart"}>
                    <span className="icon-wrapper">
                        <FiShoppingCart className="icon-btn mt-1" />
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
            <div className="search-box search-medium">
                <FiSearch className="icon" />
                <input
                    placeholder="Search powers..."
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    onKeyDown={handleNavSearch}
                />
            </div>

            <div className="hamburger" onClick={() => setOpen(!open)}>
                {open ? <FiX /> : <FiMenu />}
            </div>

            <div className={`mobile-menu ${open ? "open" : ""}`}>
                <div className="search-box search-mobile mt-3">
                    <FiSearch className="icon" />
                    <input
                        placeholder="Search powers..."
                        value={navSearch}
                        onChange={(e) => setNavSearch(e.target.value)}
                        onKeyDown={handleNavSearch}
                    />
                </div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/about">About Us</NavLink>

            </div>
        </header>
    );
};

export default Navbar;
