import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_KEY || "jwt-secured-key"; // Use env variable for security

/** 
 * 🔹 Handle Registration & Login in a Single API Route 
 * 🔹 Handle User Authentication (Protected Route) 
 */
export async function POST(req) {
    try {
        const { action, username, email, password } = await req.json();
        const db = await connectToDatabase();

        // 🔹 Handle User Registration
        if (action === "register") {
            const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (rows.length > 0) {
                return NextResponse.json({ message: "User already exists" }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                           [username, email, hashedPassword]);

            return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
        }

        // 🔹 Handle User Login
        if (action === "login") {
            const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (rows.length === 0) {
                return NextResponse.json({ message: "User does not exist" }, { status: 404 });
            }

            const isMatch = await bcrypt.compare(password, rows[0].password);
            if (!isMatch) {
                return NextResponse.json({ message: "Wrong password" }, { status: 401 });
            }

            const token = jwt.sign({ id: rows[0].id }, JWT_SECRET, { expiresIn: "3h" });
            return NextResponse.json({ token }, { status: 200 });
        }

        return NextResponse.json({ message: "Invalid action" }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * 🔹 Protected Route: Fetch User Data from Token
 */
export async function GET(req) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ message: "No token provided" }, { status: 403 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: rows[0] }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
