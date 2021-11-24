import react from 'react'
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'Navbar';
export default function AdminHome() {
return (
<div>
    
    
    {Navbar()};

  



    <div>
        <button className="bg-dark adminButtons">Create Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons">View Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons">Search Flights</button>
        </div>


   

</div>
);
}



