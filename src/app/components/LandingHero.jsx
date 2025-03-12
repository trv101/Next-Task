"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingHero({bgImage}){
    const router = useRouter();

    const handleLogout = () => {
        router.push("/pages/login"); };
    return(
        <div className="landing-hero">
            <h1>Welcome to Nexen!</h1>
            <div className="home">
                <button onClick={handleLogout}>Signup / Login</button>
            </div>
        
            <Link href="/pages/LoginRegister"></Link>
            <img className="bgImage"
            src= {bgImage}
            alt= "background-banner"/>
        </div>
    );
}