"use client";
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const router = useRouter();
    const [values, setValues] = useState({ emailOrUsername: "", password: "" });

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "login",
                    email: values.emailOrUsername,
                    username: values.emailOrUsername,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Login failed. Please try again.");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/pages/home"; // ✅ Instantly redirects & refreshes
            }, 500);
            
        } catch (err) {
            console.error("Error during login:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <Toaster position="top-right" reverseOrder={false} />
            
            <div className="wrapper">
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>

                        <div className="input-box">
                            <input type="text" name="emailOrUsername" placeholder="Email or Username" onChange={handleChanges} required />
                            <FaUser className="icon" />
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
        </div>
    );
}
