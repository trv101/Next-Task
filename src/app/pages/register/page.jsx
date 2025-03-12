"use client";
import './Register.css'; // ✅ Keep your original CSS import
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [values, setValues] = useState({ username: "", email: "", password: "" });

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "register", ...values }),
        });

        if (response.ok) {
            router.push("/pages/login");
        } else {
            console.log("Registration failed");
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box register">
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>

                    <div className="input-box">
                        <input type="text" name="username" placeholder="Username" onChange={handleChanges} required />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="email" name="email" placeholder="Email" onChange={handleChanges} required />
                        <FaEnvelope className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <Link href="/pages/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
