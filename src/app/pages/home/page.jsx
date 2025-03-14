"use client";
import './Home.css'; // ✅ Keep your original CSS import
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa"; // ✅ Import User Edit Icon

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!token || !userData) {
            router.push("/pages/login");
            return;
        }

        setUser(userData);
    }, []);

    const handleEditProfile = () => {
        router.push("/pages/profile"); // ✅ Redirect to Profile Page
    };

    return (
        <div className="home-container">
            {/* ✅ Header Section - Welcome Message & Edit Profile */}
            {user && (
                <div className="header-section">
                    <h2 className="welcome-message">Welcome, {user.username}!</h2>
                    <button className="edit-profile-btn" onClick={handleEditProfile}>
                        <FaUserEdit size={18} /> Edit Profile
                    </button>
                </div>
            )}

            {/* ✅ Card Container - Services & Options */}
            <div className="card-container">
                <div className="card">
                    <h3>📅 Book an Appointment</h3>
                    <p>Schedule a tyre change or vehicle service.</p>
                </div>

                <div className="card">
                    <h3>🛒 My Orders</h3>
                    <p>View your past purchases and service history.</p>
                </div>

                <div className="card">
                    <h3>🏷️ Special Offers</h3>
                    <p>Check out exclusive discounts and promotions.</p>
                </div>

                <div className="card">
                    <h3>📞 Contact Support</h3>
                    <p>Get help or request a call from our team.</p>
                </div>
            </div>
        </div>
    );
}
