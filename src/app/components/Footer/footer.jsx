"use client";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* 🔹 Company Info Section */}
                <div className="footer-column">
                    <h3>NEXEN Tyres</h3>
                    <p>Providing quality tyres and professional vehicle services since 1995.</p>
                </div>

                {/* 🔹 Quick Links Section */}
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* 🔹 Contact Section */}
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <p><FaMapMarkerAlt /> 123 Tyre Street, London, UK</p>
                    <p><FaPhone /> +44 123 456 789</p>
                    <p><FaEnvelope /> support@nexentyres.com</p>
                </div>

                {/* 🔹 Social Media Section */}
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            {/* 🔹 Copyright Section */}
            <div className="footer-bottom">
                <p>© 2025 Nexen Tyres. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
