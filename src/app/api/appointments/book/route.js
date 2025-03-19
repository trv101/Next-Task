import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, date, timeSlot } = body;

        if (!userId || !date || !timeSlot) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const db = await connectToDatabase();

        // ✅ Check if the slot is already booked
        const [existingBooking] = await db.execute(
            "SELECT * FROM appointments WHERE date = ? AND time_slot = ?",
            [date, timeSlot]
        );

        if (existingBooking.length > 0) {
            return NextResponse.json({ message: "This time slot is already booked!" }, { status: 400 });
        }

        // ✅ Prevent Past Date Bookings
        const now = new Date();
        const currentDate = now.toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

        if (date < currentDate) {
            return NextResponse.json({ message: "Cannot book past dates!" }, { status: 400 });
        }

        // ✅ Prevent Past Time Slots (if booking for today)
        if (date === currentDate) {
            const [hour, minute] = timeSlot.split(":").map(Number);
            const selectedTime = hour * 60 + (minute || 0); // Convert selected time to minutes

            if (selectedTime <= currentTime) {
                return NextResponse.json({ message: "Cannot book past time slots!" }, { status: 400 });
            }
        }

        // ✅ Insert appointment if slot is available
        await db.execute(
            "INSERT INTO appointments (user_id, date, time_slot) VALUES (?, ?, ?)",
            [userId, date, timeSlot]
        );

        return NextResponse.json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
