import "./page.css"; // ✅ Import the CSS file
import Navbar from "./components/navbar/navbar.jsx";
import LandingHero from "./components/LandingHero.jsx";
import WhoWeAre from "./components/WhoWeAre.jsx"; 
import Services from "./components/Services.jsx";
import AboutUs from "./components/about.jsx";


export default function App() {
  return (
    <div className="page-container">
      <Navbar />
      <LandingHero bgImage="/nexen.jpg" />

      <div className="section who-we-are">
        <WhoWeAre />
      </div>

      <div className="section services">
        <Services />
      </div>

      <div className="section about-us">
        <AboutUs />
      </div>
      
    </div>
  );
}
