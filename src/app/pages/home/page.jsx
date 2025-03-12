"use client";
import './Home.css'; // ✅ Keep your original CSS import
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/pages/login");
            return;
        }

        fetch("/api/auth", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.user) router.push("/pages/login");
        })
        .catch(() => router.push("/pages/login"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/pages/login");
    };

    return (
        <div className="home">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
}
