import React, {useState,useEffect} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest';

import session from "express-session";

var flag = true;

const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };

export default function UpdateFlight(){

    let {flight} = useParams(); 
    const location = useLocation();
    const navigate = useNavigate();

   
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
    const [DepartureFlight, setDepartureFlight] = useState(location.state.departureFlight);

    const [ReturnFlight, setReturnFlight] = useState(location.state.returnFlight);
    const [isUser, setIsUser] = useState(false);


      useEffect(() => {
<<<<<<< HEAD
        console.log("SSSSSSSSSUUUUUUUUUUUUUUUIIIIIIIIIIIIIIISS");
      

      //   axios.get('/returnFlight')
      // .then(res => {
      //   setReturnFlight(res.data);

      //   })
      // .catch(function (error) {
      //     console.log(error);
      // })
      // axios.get('/departureFlight')
      // .then(res => {
      //   setDepartureFlight(res.data);

      //   })
      // .catch(function (error) {
      //     console.log(error);
      // })
      axios.get('/session')
=======
         axios.get('/returnFlight')
      .then(res => {
        setReturnFlight(res.data);

        })
      .catch(function (error) {
          console.log(error);
      })
       axios.get('/departureFlight')
      .then(res => {
        setDepartureFlight(res.data);

        })
      .catch(function (error) {
          console.log(error);
      })
       axios.get('/session')
>>>>>>> 9c17d4f0b60f0f95461f4f9c73a37a5ffcc026f3
      .then(res => {
        if(res.data==false)
          setIsUser(false);
        else
          setIsUser(true);
      })
        // code to run on component mount
      }, [])    
      
 
 
     
  

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
   function reserveFlight(){
    axios.get('/session')
    .then(res => {
      if(res.data==false)
      {
        if (window.confirm("You must be logged in to reserve a flight. Do you want to login?")) {
          navigate('/login');

       } else {
         
         }
      }
      else{
        axios.get('/reserveFlight')
    .then(res => {
            navigate('/Itinerary');
    })

      }
    })
    
            


  }

function Label(props){
    const {labelName,labeType,method}=props;
    return(
         <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {labelName }
                    </label>
                    <input
                     type={labeType} onChange={method} placeholder={labeType} autoFocus="autoFocus" key={labelName}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
    );
}
function DoubleLabel(props){
    const {labelName,labeFirstType,method1,labeSecondType,method2}=props;
    return(
         <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {labelName}
                    </label>
                    <input
                     type={labeFirstType} onchange = {method1}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    <input
                     type={labeSecondType} onchange = {method2}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
    );
}
if(DepartureFlight==null || ReturnFlight==null)
{return(
  <>
{isUser&&Navbar()};
{!isUser&&NavbarGuest()};
<h2 className="text-center mt-20" >Please wait while your request is being processed</h2>
<div class="loader "></div>

  </>
)
}
  
  
return(DepartureFlight&&ReturnFlight &&


<>
{isUser&&Navbar()};
{!isUser&&NavbarGuest()};

      
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
                   <h1>Summary of round trip</h1>
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
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {reserveFlight}
                       /* if (window.confirm("You must be logged in to confirm the trip")) {
                        navigate('/login');

                      } else {
                        
                        }
                      
                        
                            }}*/
                    >
                      Reserve Trip
                    </button>
                  </div>

               </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
);}
//ReactDOM.render(<createFlight/>,document.getElementById('root'));