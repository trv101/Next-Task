"use client";
import "./Contact.css";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
    const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!values.name || !values.email || !values.phone || !values.message) {
            toast.error("All fields are required!");
            return;
        }

        try {
            // Simulate sending the message
            setTimeout(() => {
                toast.success("Message sent successfully!");
            }, 1000);
            
            setValues({ name: "", email: "", phone: "", message: "" }); // Reset form
        } catch (error) {
            toast.error("Failed to send message. Try again.");
        }
    };

    return (
        <div className="contact-container">
            <Toaster position="top-right" reverseOrder={false} />
            
            <div className="wrapper">
                <div className="form-box contact">
                    <form onSubmit={handleSubmit}>
                        <h1>Contact Us</h1>

                        <div className="input-box">
                            <input type="text" name="name" placeholder="Your Name" value={values.name} onChange={handleChanges} required />
                            <FaUser className="icon" />
                        </div>

                        <div className="input-box">
                            <input type="email" name="email" placeholder="Your Email" value={values.email} onChange={handleChanges} required />
                            <FaEnvelope className="icon" />
                        </div>

                        <div className="input-box">
                            <input type="tel" name="phone" placeholder="Phone Number" value={values.phone} onChange={handleChanges} required />
                            <FaPhone className="icon" />
                        </div>

                        <div className="input-box textarea-box">
                            <textarea name="message" placeholder="Your Message" value={values.message} onChange={handleChanges} required />
                        </div>

                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
