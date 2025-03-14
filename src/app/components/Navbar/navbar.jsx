"use client";
import "./navbar.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token); // ✅ Convert token existence to boolean
        };

        checkAuth(); // ✅ Check authentication status when Navbar loads

        // ✅ Listen for storage changes (ensures update when user logs in/out)
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    
        setTimeout(() => {
            router.replace("/"); // ✅ Ensures proper redirection to Public Home (src/page.js)
            window.location.reload(); // ✅ Forces Navbar update immediately
        }, 100); // Small delay to allow state update
    };
    

    return (
        <header className="header">
              <span className="logo">NEXEN</span>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="#services">Services</a>
                <a href="#about">About</a>
                <a href="/pages/contact">Contact</a>


                <a href="/pages/home" className="user-button">
                    <FaUserCircle className="user-icon" /> {/* 🔹 User Circle Icon */}
                </a>

                {/* ✅ Show Login if user is NOT logged in */}
                {!isLoggedIn ? (
                    <a href="/pages/login" className="login-button">Login</a>
                ) : (
                    <a onClick={handleLogout} className="logout-button">Logout</a> // ✅ Now logout button behaves like login button
                )}
            </nav>
        </header>
    );
}
