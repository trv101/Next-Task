import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_KEY || "jwt-secured-key";

/** 
 * 🔹 Handle Registration, Login (email/username), and Authentication
 */
export async function POST(req) {
    try {
        const { action, username, email, password, firstName, lastName } = await req.json();
        const db = await connectToDatabase();

        // 🔹 Handle User Registration
        if (action === "register") {
            const [rows] = await db.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);
            if (rows.length > 0) {
                return NextResponse.json({ message: "User already exists" }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query(
                "INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)",
                [firstName, lastName, username, email, hashedPassword]
            );

            return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
        }

        // 🔹 Handle User Login (Allow email or username)
        if (action === "login") {
            const [rows] = await db.query(
                "SELECT * FROM users WHERE email = ? OR username = ?",
                [email || username, email || username] // Accepts either email or username
            );

            if (rows.length === 0) {
                return NextResponse.json({ message: "User does not exist" }, { status: 404 });
            }

            const isMatch = await bcrypt.compare(password, rows[0].password);
            if (!isMatch) {
                return NextResponse.json({ message: "Wrong password" }, { status: 401 });
            }

            const token = jwt.sign({ id: rows[0].id }, JWT_SECRET, { expiresIn: "3h" });

            return NextResponse.json({ token, user: { 
                id: rows[0].id, 
                firstName: rows[0].firstName, 
                lastName: rows[0].lastName, 
                username: rows[0].username, 
                email: rows[0].email 
            }}, { status: 200 });
        }

        return NextResponse.json({ message: "Invalid action" }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * 🔹 Protected Route: Get User Profile
 */
export async function GET(req) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT id, firstName, lastName, username, email FROM users WHERE id = ?", [decoded.id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: rows[0] }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * 🔹 Protected Route: Edit User Profile
 */
export async function PUT(req) {
    try {
        const { token, firstName, lastName, username, email } = await req.json();
        
        if (!token) {
            console.error("❌ No token provided"); // Debugging
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("✅ Token Verified. User ID:", decoded.id); // Debugging

        const db = await connectToDatabase();

        const [result] = await db.query(
            "UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?",
            [firstName, lastName, username, email, decoded.id]
        );

        if (result.affectedRows === 0) {
            console.warn("⚠️ No changes made to the profile");
            return NextResponse.json({ message: "No updates made" }, { status: 400 });
        }

        console.log("✅ Profile updated successfully");
        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("❌ Error updating profile:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
