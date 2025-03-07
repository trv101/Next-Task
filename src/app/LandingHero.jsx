export default function LandingHero({bgImage}){
    return(
        <div className="landing-hero">
            <h1>Welcome to Nexen!</h1>
            <img className="bgImage"
            src= {bgImage}
            alt= "background-banner"/>
        </div>
    );
}