import react from 'react'
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'Navbar';
import {useNavigate} from 'react-router-dom';

export default function UserHome() {
    const navigate = useNavigate();
    function viewReservedFlights(){
       //  navigate('/createFlight');
    }

    function goUserAccount(){
       // navigate('/viewFlights');
    }

    function goSearchFlights(){
      //  navigate('/searchWithCriteria');
    }
return (
<div>
    
    
    {Navbar()};

  



    <div>
        <button className="bg-dark adminButtons" onClick={viewReservedFlights}>Reserved Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons" onClick={goUserAccount}>User Account</button>
    </div>


   

</div>
);
}



