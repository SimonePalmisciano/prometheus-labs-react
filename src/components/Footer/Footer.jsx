import "../../styles/footer.css";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                {/* BRAND */}
                <div className="footer-brand">
                    <h3>PrometheusLABS</h3>
                    <p>We Shape the Future of Human Potential.</p>
                </div>

                {/* CONTACTS */}
                <div className="footer-contacts">
                    <h4>Contacts</h4>
                    <p>Email: info@prometheuslabs.com</p>
                    <p>Phone +39 02 987 1234</p>
                    <p>Address: Via Roma 12, Milan 20100 - Italy</p>
                </div>

                {/* NAVIGATION */}
                <div className="footer-nav">
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </div>

                {/* SOCIAL */}
                <div className="footer-social">
                    <h4>Social</h4>
                    <ul>
                        <li><a href="#"><FaInstagram className="social-icon" />Instagram</a></li>
                        <li><a href="#"><FaYoutube className="social-icon" />YouTube</a></li>
                        <li><a href="#"><FaFacebook className="social-icon" />Facebook</a></li>
                        <li><a href="#"><FaLinkedin className="social-icon" />LinkedIn</a></li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 PrometheusLABS — All rights reserved.</p>
            </div>

        </footer>
    );
}
