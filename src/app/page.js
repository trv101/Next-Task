
import LandingHero from "./components/LandingHero.jsx";
import WhoWeAre from "./components/WhoWeAre.jsx"; 
import Services from "./components/Services.jsx";
import AboutUs from "./components/about.jsx";

export default function Home() {
  return (
    <div>
     <LandingHero bgImage = "/nexen.jpg" />
     
     <WhoWeAre/>
     <Services/>
     <AboutUs/>
    </div>
  );
}
