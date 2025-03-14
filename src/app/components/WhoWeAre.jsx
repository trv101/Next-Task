import Link from "next/link";

export default function WhoWeAre() {
    return (
        <div 
            style={{
                backgroundColor: "white",
                padding: "50px",
                borderRadius: "10px",
                textAlign: "center",
                width: "100%",
                maxWidth: "1200px",
                margin: "20px auto",
            }}
        >
            <h2 
                style={{
                    fontWeight: "bold",
                    fontSize: "2.3rem",
                    color: "#f70ff7",
                    marginBottom: "15px",
                }}
            >
                Who We Are
            </h2> 
            
            <p 
                style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#555",
                }}
            >
                We are a company committed to excellence and delivering top services.
            </p>

            <Link 
                href="/pages/video-gallery"
                
            >
                Check-out the Video Gallery
            </Link>
        </div>
    );
}
