import "../../styles/footer.css";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";


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
                    <h4>Contatti</h4>
                    <p>Email: info@prometheuslabs.fake</p>
                    <p>Telefono: +39 345 987 1234</p>
                    <p>Indirizzo: Via Roma 12, Milano</p>
                </div>

                {/* SOCIAL */}
                <div className="footer-social">
                    <h4>Social</h4>
                    <ul>

                        <li>
                            <a href="#">
                                <FaInstagram className="social-icon" />
                                Instagram
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaYoutube className="social-icon" />
                                YouTube
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaFacebook className="social-icon" />
                                Facebook
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaLinkedin className="social-icon" />
                                LinkedIn
                            </a>
                        </li>

                    </ul>
                </div>


            </div>

            <div className="footer-bottom">
                <p>© 2026 PrometheusLABS — All rights reserved.</p>
            </div>

        </footer>
    );
}
