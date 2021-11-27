import react from 'react'
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'Navbar';
import {useNavigate} from 'react-router-dom';

export default function AdminHome() {
    const navigate = useNavigate();
    function goCreateFlight(){
        navigate('/createFlight');
    }

    function goViewFlights(){
        navigate('/viewFlights');
    }

    function goSearchFlights(){
        navigate('/searchWithCriteria');
    }
return (
<div>
    
    
    {Navbar()};

  



    <div>
        <button className="bg-dark adminButtons" onClick={goCreateFlight}>Create Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons" onClick={goViewFlights}>View Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons" onClick={goSearchFlights}>Search Flights</button>
        </div>


   

</div>
);
}



