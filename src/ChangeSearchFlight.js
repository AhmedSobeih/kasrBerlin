import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest.js';



const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };

export default function SearchFlightGuest(){
    console.log("here");

    const [DepartureDateVisibility, setDepartureDateVisibility] = useState(true);
    const [ArrivalDateVisibility, setArrivalDateVisibility] = useState(true);


    const navigate = useNavigate();
    const location = useLocation();


    const [NumberOfAdults, setNumberOfAdults] = useState(location.state.reservation.DepatureFlightSeats.length);
    const [NumberOfChildren, setNumberOfChildren] = useState(0);
    const [DepatureTime, setDepatureTime] = useState("");
    const [DepatureDate, setDepatureDate] = useState("");
    const [ArrivalTime, setArrivalTime] = useState("");
    const [ArrivalDate, setArrivalDate] = useState("");
    const [DepatureAirport, setDepatureAirport] = useState(location.state.oldFlight.DepatureAirport);
    const [ArrivalAirport, setArrivalAirport] = useState(location.state.oldFlight.ArrivalAirport);
    const [CabinClass, setCabinClass] = useState("Economy Class");
    const [UserCriteria, setUserCriteria] = useState({});

    const [isUser, setIsUser] = useState(false);


   
    const [ErrorMessage, setErrorMessage] = useState("");

    try{
      var accessToken = localStorage.getItem('acessToken');
      var refreshToken = localStorage.getItem('refreshToken');
      var type = localStorage.getItem('type');
      if(accessToken == null)
      {
        isUser = false;
      }
      }
      catch(err)
      {
        isUser = false;
      }


    
   
  const showDepartureDate = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setDepartureDateVisibility(false);
    } else {
     setDepartureDateVisibility(true);
    }
  };
  const showArrivalDate = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setArrivalDateVisibility(false);
    } else {
     setArrivalDateVisibility(true);
    }
  };

  
 
 
  function searchFlight (){
    if(NumberOfAdults<=0 && NumberOfChildren<=0)
    {
      setErrorMessage('Please enter a valid number of passenger');
      return;
    }

    var bodyFormData = new FormData();
    bodyFormData.append('NumberOfAdults', location.state.reservation.DepatureFlightSeats.length);
    UserCriteria.NumberOfAdults=NumberOfAdults;
    bodyFormData.append('NumberOfChildren', 0);
    UserCriteria.NumberOfChildren=0;
    bodyFormData.append('DepatureTime', DepatureTime);
    UserCriteria.DepatureTime=DepatureTime;
    bodyFormData.append('DepatureDate', DepatureDate);
    UserCriteria.DepatureDate=DepatureDate;
    bodyFormData.append('ArrivalTime', ArrivalTime);
    UserCriteria.ArrivalTime=ArrivalTime;
    bodyFormData.append('ArrivalDate', ArrivalDate);
    UserCriteria.ArrivalDate=ArrivalDate;
    bodyFormData.append('DepatureAirport', DepatureAirport);
    UserCriteria.DepatureAirport=DepatureAirport;
    bodyFormData.append('ArrivalAirport', ArrivalAirport);
    UserCriteria.ArrivalAirport=ArrivalAirport;
    setCabinClass(document.getElementById("CabinClass").value);
    if(location.state.Type=="Departure")
   { 
    
    bodyFormData.append('DepartureCabinClass', CabinClass);
    UserCriteria.DepartureCabinClass=CabinClass;
    bodyFormData.append('ReturnCabinClass', location.state.reservation.ReturnCabinClass);
    UserCriteria.ReturnCabinClass=location.state.reservation.ReturnCabinClass;
    bodyFormData.append('isReturnFlight', false);

  }
    else
   {
     console.log("Departure " + location.state.reservation.DepartureCabinClass);
    bodyFormData.append('DepartureCabinClass', location.state.reservation.DepartureCabinClass);
    UserCriteria.DepartureCabinClass=location.state.reservation.DepartureCabinClass;
    console.log("Return  " + CabinClass);

    bodyFormData.append('ReturnCabinClass', CabinClass);
    UserCriteria.ReturnCabinClass=CabinClass;
    bodyFormData.append('isReturnFlight', false);
   }
    console.log("accessToken" + accessToken);
   //done
    axios({
      method: "post",
      url: "/userCriteria",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" , "Authorization":"Bearer "+ accessToken },
    })
        .then((response) => { 
          
         console.log(response.data);
      }).catch(err => console.log(err));
  
  axios({
    method: "post",
    url: "/searchFlightUser",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
      .then((response) => { 
        
        if(response.data==false)
       {
        setErrorMessage('The information you entered does not match with any flights');
        document.getElementById('searchFail').setAttribute("class","alert alert-danger text-center") ;

       } 
        else{
          navigate("/changeSearchResFlight", {state: {reservation:location.state.reservation,s:UserCriteria, oldFlight: location.state.oldFlight, Type:location.state.Type}});
        }
    })
  }
  function handleNumberOfAdults(number){
    setNumberOfAdults(number.target.value);
    console.log(NumberOfAdults);
  }
  function handleNumberOfChildren(number){
    setNumberOfChildren(number.target.value);
    console.log(NumberOfChildren);
  }
  function handleDepatureTime(time){
    setDepatureTime(time.target.value);
    console.log(DepatureTime);
  }
  function handleDepatureDate(date){
    setDepatureDate(date.target.value);
    console.log(DepatureDate);
  }
  function handleArrivalDate(date){
    setArrivalDate(date.target.value);
    console.log(ArrivalDate);
  }
  function handleArrivalTime(time){
    setArrivalTime(time.target.value);
    console.log(ArrivalTime);
  }
  function handleDepatureAirport(text){
    setDepatureAirport(text.target.value);
    console.log(DepatureAirport);
  }
  function handleArrivalAirport(text){
    setArrivalAirport(text.target.value);
    console.log(ArrivalAirport);
  }

  function handleCabinClass(text){
    setCabinClass(document.getElementById("CabinClass").value);
    console.log(CabinClass);
  }
  axios({
    method: "get",
    url: "/session",
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            if(response.data.name == "TokenExpiredError" || response.data.name == "JsonWebTokenError")
              {
                setIsUser(false);
              }
            else
            {
              setIsUser(true);
              console.log(response.data);   
            }
});
  


 
  
  
 

return(


<>
{
  isUser&&
   Navbar()
}
{
  !isUser&&
   NavbarGuest()
}

      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
                <div className="btn-wrapper text-center">
                 </div>
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                 
                <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Search with Criteria</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                   
               
                  <div className="relative w-full mb-3" >
                   
                    <label
                    style={{margin:'5px'}}
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Seats
                    </label>
                   <div>{location.state.reservation.DepatureFlightSeats.length}</div>
                  </div>
                  
                  <div className="relative w-full mb-3">
                      
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Cabin Class
                    </label>
                    <select name = "dropdown" id="CabinClass" onChange={handleCabinClass}>
            <option value = "Economy Class">Economy Class</option>
            <option value = "Business Class" >Business Class</option>
            <option value = "First Class" >First Class</option>

         </select>
                  </div>
                  <div className="relative w-full mb-3" >
                     <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showDepartureDate(e);
                            }}/>
                    <label
                    style={{margin:'5px'}}
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Departure Date
                    </label>
                    <input
                     hidden={DepartureDateVisibility} 

                     type="number" onChangeCapture={(e) => {
                      handleDepatureDate(e);}}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3" >
                     <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showArrivalDate(e);
                            }}/>
                    <label
                    style={{margin:'5px'}}
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date
                    </label>
                    <input
                     hidden={ArrivalDateVisibility} 

                     type="number" onChangeCapture={(e) => {
                      handleArrivalDate(e);}}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  
                  <div className="relative w-full mb-3" >
                    
                    <label
                    style={{margin:'0px'}}
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    Departure Airport
                    </label>
                   <div>{location.state.oldFlight.DepatureAirport}</div>
                  </div>
                  
                 
                  <div className="relative w-full mb-3" >
                    
                    <label
                    style={{margin:'0px'}}
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport
                    </label>
                   <div>{location.state.oldFlight.ArrivalAirport}</div>
                  </div>
               
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={(e) => {
                        searchFlight(e);}}
                    >
                        Search The Flight
                    </button>
                  </div>
                </form>
                <div id='searchFail' className="alert-warning">{ErrorMessage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);
}