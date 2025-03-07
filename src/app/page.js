import LandingHero from "./LandingHero.jsx";
import WhoWeAre from "./WhoWeAre.jsx"; 
import Services from "./Services.jsx";
import AboutUs from "./about.jsx";

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
