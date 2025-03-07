import Link from "next/link";

export default function WhoWeAre(){
    return(
        <div className="who-we-are">
        <h2>Who We Are</h2> 
        <p> We are a company committed to excellence and delivering top services.</p>
        <Link href ="/video-gallery">Check-out the Video Gallery</Link> 
        </div>
    );
}