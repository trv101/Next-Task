"use client";
import './Profile.css';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; 

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        Age:"",
        username: "",
        email: "",
    });

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
        .then(res => res.json())
        .then(data => {
            if (!data.user) {
                router.push("/pages/login");
            } else {
                setUser(data.user);
            }
        })
        .catch(() => router.push("/pages/login"));
    }, []);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("/api/auth", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, ...user }),
            });

            const data = await response.json();
            if (response.status === 200) {
                toast.success("Profile updated successfully!"); 
            } else {
                toast.error("Update failed: " + data.message);
            }
        } catch (error) {
            toast.error("Update failed. Check console for details.");
        }
    };

    return (
        <div className="profile-container">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="profile">
                <h2>Edit Profile</h2>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={user.firstName} 
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={user.lastName} 
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Age" 
                    value={user.Age} 
                    onChange={(e) => setUser({ ...user, Age: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={user.username} 
                    onChange={(e) => setUser({ ...user, username: e.target.value })} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={user.email} 
                    onChange={(e) => setUser({ ...user, email: e.target.value })} 
                />
                <button onClick={handleUpdate}>Update Profile</button>
            </div>
        </div>
    );
}
