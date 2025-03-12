"use client";
import './Login.css'; // ✅ Keep your original CSS import
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [values, setValues] = useState({ email: "", password: "" });

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "login", ...values }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            router.push("/pages/home");
        } else {
            console.log("Login failed");
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div className="input-box">
                        <input type="email" name="email" placeholder="Email" onChange={handleChanges} required />
                        <FaEnvelope className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <Link href="/pages/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
