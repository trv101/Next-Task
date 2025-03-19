"use client";
import './Appointment.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Appointment() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [availableSlots, setAvailableSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!token || !userData) {
            router.push("/pages/login");
            return;
        }

        setUser(userData);

        // ✅ Fetch available slots
        fetch("/api/appointments/available")
            .then(res => res.json())
            .then(data => {
                if (data.availableSlots) {
                    setAvailableSlots(data.availableSlots);
                } else {
                    setAvailableSlots({});
                }
            })
            .catch(() => {
                toast.error("Failed to load available slots.");
                setAvailableSlots({});
            });
    }, []);

    const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
        toast.error("Please select a date and time.");
        return;
    }

    setLoading(true);
    try {
        const response = await fetch("/api/appointments/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                date: selectedDate,
                timeSlot: selectedTime,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            toast.success("Appointment booked successfully!");

            // ✅ Remove booked slot from UI immediately
            setAvailableSlots((prevSlots) => {
                const updatedSlots = { ...prevSlots };
                updatedSlots[selectedDate] = updatedSlots[selectedDate]?.filter(slot => slot !== selectedTime);

                // ✅ If no slots left for that date, remove the date key
                if (updatedSlots[selectedDate]?.length === 0) {
                    delete updatedSlots[selectedDate];
                }
                return updatedSlots;
            });

            setTimeout(() => {
                router.push("/pages/home");
            }, 2000);
        } else {
            toast.error(data.message || "Failed to book appointment.");
        }
    } catch (error) {
        toast.error("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};

    
    return (
        <div className="appointment-container">
            <Toaster position="top-right" reverseOrder={false} />
            
            <h2 className="appointment-title">Book an Appointment</h2>

            <form className="appointment-form" onSubmit={handleBooking}>
                <label>Full Name:</label>
                <input type="text" value={user?.username || ""} disabled />

                <label>Email:</label>
                <input type="email" value={user?.email || ""} disabled />

                <label>Select Date:</label>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required>
                    <option value="" disabled>Select a date</option>
                    {Object.keys(availableSlots).map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>

                <label>Select Time:</label>
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                    <option value="" disabled>Select a time</option>
                    {selectedDate && availableSlots[selectedDate]?.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>

                <button type="submit" disabled={loading || !selectedDate || !selectedTime}>
                    {loading ? "Booking..." : "Confirm Appointment"}
                </button>
            </form>
        </div>
    );
}
