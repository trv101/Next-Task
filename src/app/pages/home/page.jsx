"use client";
import Link from "next/link";
import './Home.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!token || !userData) {
            router.push("/pages/login");
            return;
        }

        setUser(userData);

        // ✅ Fetch future appointments
        fetch(`/api/appointments/user?userId=${userData.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.appointments && data.appointments.length > 0) {
                    setAppointments(data.appointments);
                }
            })
            .catch(() => {
                toast.error("Failed to load appointments.");
            });
    }, []);

    const handleEditProfile = () => {
        router.push("/pages/profile");
    };

    function formatDate(utcDate) {
        const localDate = new Date(utcDate);
        return localDate.toISOString().split("T")[0]; // Extracts YYYY-MM-DD in local time
    }
    

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

            {/* ✅ Future Appointments Section */}
            {appointments.length > 0 && (
                <div className="appointments-section">
                    <button className="toggle-appointments-btn" onClick={() => setShowAppointments(!showAppointments)}>
                        {showAppointments ? "Hide Upcoming Appointments" : "View Upcoming Appointments"}
                    </button>

                    {showAppointments && (
                        <ul className="appointments-list">
                            {appointments.map((appt) => (
                                <li key={appt.id}>
                                📍 {formatDate(appt.date)} - 🕒 {appt.time_slot}
                            </li>
                            
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* ✅ Card Container - Services & Options */}
            <div className="card-container">
                <Link href="/pages/appointment" className="card-link">
                    <div className="card">
                        <h3>📅 Book an Appointment</h3>
                        <p>Schedule a tyre change or vehicle service.</p>
                    </div>
                </Link>

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
