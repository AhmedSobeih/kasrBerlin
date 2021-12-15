import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import Navbar from 'NavbarUser';

var flag = true;

const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };

export default function Itinerary(){

    let {flight} = useParams(); 
    const navigate = useNavigate();

   
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
    const [DepartureFlight, setDepartureFlight] = useState("");

    const [ReturnFlight, setReturnFlight] = useState("");
    const [isUser, setIsUser] = useState({});

    






    const CancelToken = axios.CancelToken;
    let cancel;
   

      axios.get('/departureFlight')
      .then(res => {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
        
        setDepartureFlight(res.data);
     


      })
      .catch(function (error) {
          console.log(error);
      })

      axios.get('/returnFlight')
      .then(res => {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
        
        setReturnFlight(res.data);
     


      })
      .catch(function (error) {
          console.log(error);
      })
      axios.get('/session')
      .then(res => {
        if(res.data==false)
          setIsUser(false);
        else
          setIsUser(true);
      })
 
     
  

function dateConversion(date){
    let newDate = "";
    for(var i=0;i<16;i++)
    {
        newDate = newDate + date[i];
    }
    // 2001-02-10T22:25
    //2000-10-10T15:02:00.000Z
    return newDate;
  }

  /*
  function reserveFlight(){
    axios.get('/returnFlight')
    .then(res => {
      if(res.data==false)
      {
        if (window.confirm("You must be logged in to confirm the trip")) {
            navigate('/login');

          } else {
            
            }
      }
      else
        navigate('/viewFlights');
      })
      
  }*/



  
  
return(


<>
{Navbar()};

      
      <div className="container mx-auto px-4">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
                <div className="btn-wrapper text-center">
                 </div>
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-8000 text-center mb-8 font-bold">
                   <h1>Your Flight Itinerary</h1>
                </div>
              <table class="table">
  <thead class="thead-dark">
    <tr>
      <th width="25%" scope="col">Property</th>
      <th width="25%" scope="col">Departure Flight</th>
      <th width="25%" scope="col">Return Flight</th>

    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">Flight Number</th>
      <td>{DepartureFlight.FlightNumber}</td>
      <td>{ReturnFlight.FlightNumber}</td>
    </tr>
    
    <tr>
      <th scope="row">Departure Time</th>
      <td>{DepartureFlight.DepatureDate}</td>
      <td>{ReturnFlight.DepatureDate}</td>
    </tr>
    <tr>
      <th scope="row">Arrival Time</th>
      <td>{DepartureFlight.ArrivalDate}</td>
      <td>{ReturnFlight.ArrivalDate}</td>
    </tr>
    <tr>
      <th scope="row">Departure Airport</th>
      <td>{DepartureFlight.DepatureAirport}</td>
      <td>{ReturnFlight.DepatureAirport}</td>
    </tr>
    <tr>
      <th scope="row">Arrival Airport</th>
      <td>{DepartureFlight.ArrivalAirport}</td>
      <td>{ReturnFlight.ArrivalAirport}</td>
    </tr>
    <tr>
      <th scope="row">Price</th>
      <td>{DepartureFlight.FlightPrice}</td>
      <td>{ReturnFlight.FlightPrice}</td>
    </tr>
    <tr>
      <th scope="row">Chosen Cabin</th>
      <td>{DepartureFlight.CabinClass}</td>
      <td>{ReturnFlight.CabinClass}</td>
    </tr>
    <tr>
      <th scope="row">Trip Duration</th>
      <td>{DepartureFlight.TripDuration}</td>
      <td>{ReturnFlight.TripDuration}</td>
    </tr>
    <tr>
      <th scope="row">Baggage Allowance per Passenger</th>
      <td>{DepartureFlight.BaggageAllowance}</td>
      <td>{ReturnFlight.BaggageAllowance}</td>
    </tr>
    <tr>
      <th scope="row">Seats Reserved</th>
      <td>xx </td>
      <td>xx</td>
    </tr>
  </tbody>
</table>
<div className="text-blueGray-8000 text-center mb-8 font-bold">
                   <h1>Total Price = {parseInt(DepartureFlight.FlightPrice)+parseInt(ReturnFlight.FlightPrice)}</h1>
                </div>
                <div className="text-center mt-6">
                    
                  </div>

               </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
);}
//ReactDOM.render(<createFlight/>,document.getElementById('root'));