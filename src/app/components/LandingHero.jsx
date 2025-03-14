"use client";

import "./LandingHero.css"; // ✅ Import the updated CSS

export default function LandingHero({ bgImage }) {
 

    return (
        <div className="landing-hero" style={{ backgroundImage: `url(${bgImage})` }}>
            
        </div>
    );
}
