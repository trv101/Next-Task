export default function Services(){
    const services = [{id:1, name:"Tire Repair"}, {id:2, name:"Tire Replacement"}, {id:3, name:"System Diagnostics"}];

    const getRandomColor = () => {
        const colors = ["#64B5F6", "#81C784", "#BA68C8"];
        return colors[Math.floor(Math.random() * 3)];
      };

    return(
        <div className="our-services">
            <h2>Our Services</h2>
            <ul>
                {services.map(service => (<li key={service.id} style={{backgroundColor: getRandomColor()}}>
                    {service.name}
                </li>))}
                
            </ul>
        </div>
    );
}