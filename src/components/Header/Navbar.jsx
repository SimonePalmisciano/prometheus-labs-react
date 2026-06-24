import React, { useState } from "react";
import "../../styles/Navbar.css";
import { FiSearch, FiHeart, FiShoppingCart, FiGlobe, FiSun, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="nav">
            <div className="logo">
                <img src="/logo/logo.png" alt="logo" />
            </div>

            <div className="mobile-top-icons">
                <FiSearch className="icon-btn" />
                <FiHeart className="icon-btn" />
                <FiShoppingCart className="icon-btn" />
            </div>

            <nav className="nav-center">
                <Link to="/products">Products</Link>
                <a>About Us</a>
                <a>Contact</a>
            </nav>

            <div className="nav-right">
                <div className="search-box">
                    <FiSearch className="icon" />
                    <input placeholder="Search..." />
                </div>

                <Link to={"/favourites"}>
                    <FiHeart className="icon-btn" />
                </Link>
                <Link to={"/cart"}>
                    <FiShoppingCart className="icon-btn" />
                </Link>
                <FiGlobe className="icon-btn" />
                <FiSun className="icon-btn" />
            </div>

            <div className="hamburger" onClick={() => setOpen(!open)}>
                {open ? <FiX /> : <FiMenu />}
            </div>

            <div className={`mobile-menu ${open ? "open" : ""}`}>
                <Link to="/products">Products</Link>
                <a>About Us</a>
                <a>Contact</a>
                <a className="login">Login / Register</a>
            </div>
        </header>
    );
};

export default Navbar;
