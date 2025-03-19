import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const db = await connectToDatabase();

        const [appointments] = await db.execute(
            `SELECT id, date, time_slot FROM appointments WHERE user_id = ? ORDER BY date ASC`,
            [userId]
        );

        return NextResponse.json({ appointments }, { status: 200 });

    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json({ message: "Error fetching appointments" }, { status: 500 });
    }
}
