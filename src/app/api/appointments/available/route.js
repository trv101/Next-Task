import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const db = await connectToDatabase();

        const now = new Date();
        now.setSeconds(0, 0);
        const todayFormatted = now.toISOString().split("T")[0];

        const allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

        // ✅ Fetch booked slots from DB
        const [bookedAppointments] = await db.execute(
            `SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, time_slot 
             FROM appointments 
             WHERE date >= ? ORDER BY date ASC`,
            [todayFormatted]
        );

        console.log("🔍 Booked Appointments from DB:", bookedAppointments); // Debugging

        // ✅ Organize booked slots by date (Ensure correct format)
        const bookedSlotsMap = {};
        bookedAppointments.forEach(({ date, time_slot }) => {
            if (!bookedSlotsMap[date]) {
                bookedSlotsMap[date] = new Set();
            }
            bookedSlotsMap[date].add(time_slot);
        });

        console.log("🔍 Booked Slots Map:", bookedSlotsMap); // Debugging

        // ✅ Generate available slots for the next 7 days
        const availableSlots = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(now.getDate() + i);
            const formattedDate = date.toISOString().split("T")[0];

            let validSlots = allSlots.filter(slot =>
                !(bookedSlotsMap[formattedDate] && bookedSlotsMap[formattedDate].has(slot))
            );

            // ✅ Remove past times **if today**
            if (formattedDate === todayFormatted) {
                const currentTime = now.getHours() * 60 + now.getMinutes();
                validSlots = validSlots.filter(slot => {
                    const [hour, minute] = slot.split(":").map(Number);
                    const slotTime = hour * 60 + (minute || 0);
                    return slotTime > currentTime;
                });
            }

            if (validSlots.length > 0) {
                availableSlots[formattedDate] = validSlots;
            }
        }

        console.log("✅ Final Available Slots (API Response):", availableSlots); // Debugging
        db.end();
        return NextResponse.json({ availableSlots });

    } catch (error) {
        console.error("❌ Error in API:", error);
        return NextResponse.json({ message: "Error fetching available slots" }, { status: 500 });
    }
}
