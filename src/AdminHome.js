import react from 'react'
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'Navbar';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


export default function AdminHome() {
    const navigate = useNavigate();
    var authorized = true;
    try{
        var accessToken = localStorage.getItem('acessToken');
        var refreshToken = localStorage.getItem('refreshToken');
        var type = localStorage.getItem('type');
        console.log(type);
        
        if(type == 1)
        {
          console.log(1);
          authorized = false;
          navigate('/');
        }
        }
        catch(err)
        {
          authorized = false;
          navigate('/');
        }

    var username;
    function goCreateFlight(){
        navigate('/createFlight');
    }

    function goViewFlights(){
        navigate('/viewFlights');
    }

    function goSearchFlights(){
        navigate('/searchWithCriteria');
    }
    function getUserName (){
        // const data = { username, password}
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
      
       axios({
        method: "get",
        url: "/session",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            if(response.data.name == "TokenExpiredError"|| response.data.name == "JsonWebTokenError" || !authorized)
              {
                navigate('/login');
              }
            else
            { 
            }
                     
        })
        return username;
      }
return (
<div>
    
    
    {Navbar()};
    <script>{getUserName()}</script>

  



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



