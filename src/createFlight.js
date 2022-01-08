import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from 'Navbar';
var authorized = true;

    try{
      var accessToken = localStorage.getItem('acessToken');
      var refreshToken = localStorage.getItem('refreshToken');
      var type = localStorage.getItem('type');
      
      if(type == 1)
      {
        authorized = false;
      }
      }
      catch(err)
      {
        console.log(1);
        authorized = false;
      }


const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };

export default function CreateFlight(){
    const [flightCreated, setFlightCreated] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [depatureTime, setDepatureTime] = useState("");
    const [depatureDate, setDepatureDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [economySeats, setEconomySeats] = useState("");
    const [businessSeats, setBusinessSeats] = useState("");
    const [firstSeats, setFirstSeats] = useState("");

    const [depatureAirport, setDepatureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [economySeatPrice, setEconomySeatPrice] = useState("");
    const [businessSeatPrice, setBusinessSeatPrice] = useState("");
    const [firstSeatPrice, setFirstSeatPrice] = useState("");

    const [baggageAllowance, setBaggageAllowance] = useState("");



    const navigate = useNavigate();

    try{
      var accessToken = localStorage.getItem('acessToken');
      var refreshToken = localStorage.getItem('refreshToken');
      var type = localStorage.getItem('type');
      
      if(type == 1)
      {
        navigate('/');
      }
      }
      catch(err)
      {
        navigate('/');
      }


function Label(props){
    const {labelName,labeType,method}=props;
    return(
         <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {labelName}
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
function createFlight (){
    
    var bodyFormData = new FormData();
    bodyFormData.append('flightNumber', flightNumber);
    bodyFormData.append('depatureTime', depatureTime);
    bodyFormData.append('depatureDate', depatureDate);
    bodyFormData.append('arrivalTime', arrivalTime);
    bodyFormData.append('arrivalDate', arrivalDate);
    bodyFormData.append('economySeats', economySeats);
    bodyFormData.append('businessSeats', businessSeats);
    bodyFormData.append('firstSeats', firstSeats);

    bodyFormData.append('depatureAirport', depatureAirport);
    bodyFormData.append('arrivalAirport', arrivalAirport);
    bodyFormData.append('economySeatPrice', economySeatPrice);
    bodyFormData.append('businessSeatPrice', businessSeatPrice);
    bodyFormData.append('firstSeatPrice', firstSeatPrice);
    bodyFormData.append('baggageAllowance', baggageAllowance);

  
  
  axios({
    method: "post",
    url: "/flight",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data","Authorization":"Bearer "+ accessToken},
  })
      .then((response) => { 
        console.log(response.data)
        if(response.data.name == "TokenExpiredError"|| response.data.name == "JsonWebTokenError" || !authorized)
              {
                navigate('/');
              }
        if(response.data==false)
          setFlightCreated('Invalid username or password!');
        else
          navigate('/ViewFlights');
    })
  }
  function handleFlightNumber(number){
    setFlightNumber(number.target.value);
    console.log(flightNumber);
  }
  function handleDepatureTime(time){
    setDepatureTime(time.target.value);
    console.log(depatureTime);
  }
  function handleDepatureDate(date){
    setDepatureDate(date.target.value);
    console.log(depatureDate);
  }
  function handleArrivalDate(date){
    setArrivalDate(date.target.value);
    console.log(arrivalDate);
  }
  function handleArrivalTime(time){
    setArrivalTime(time.target.value);
    console.log(arrivalTime);
  }
  function handleEconomySeats(number){
    setEconomySeats(number.target.value);
    console.log(economySeats);
  }
  function handleBusinessSeats(text){
    setBusinessSeats(text.target.value);
    console.log(businessSeats);
  }
  function handleFirstSeats(text){
    setFirstSeats(text.target.value);
    console.log(firstSeats);
  }
  function handleDepatureAirport(text){
    setDepatureAirport(text.target.value);
    console.log(depatureAirport);
  }
  function handleArrivalAirport(text){
    setArrivalAirport(text.target.value);
    console.log(arrivalAirport);
  }
  function handleEconomySeatPrice(text){
    setEconomySeatPrice(text.target.value);
    console.log(economySeatPrice);
  }
  function handleBusinessSeatPrice(text){
    setBusinessSeatPrice(text.target.value);
    console.log(businessSeatPrice);
  }
  function handleFirstSeatPrice(text){
    setFirstSeatPrice(text.target.value);
    console.log(firstSeatPrice);
  }
  function handleBaggageAllowance(number){
    setBaggageAllowance(number.target.value);
    console.log(baggageAllowance);
  }
  var username;
  function getUserName (){
    console.log(authorized);
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
            navigate('/');
          }
        else
        { 
        }
                 
    })
    return username;
  }
  

  
return(


<>
{Navbar()};
<script>{getUserName()}</script>
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
                   <h1>Creating Flight</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Flight Number
                    </label>
                    <input
                     type="number" onChangeCapture={handleFlightNumber} 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Date & Time
                    </label>
                    <input
                     type="datetime-local" onChangeCapture = {handleDepatureDate} onPointerMove={handleDepatureDate}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date & Time
                    </label>
                    <input
                     type="datetime-local" onChangeCapture = {handleArrivalDate} onPointerMove= {handleArrivalDate}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Economy Seats
                    </label>
                    <input
                     type="number" onChangeCapture={handleEconomySeats}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Business Seats
                    </label>
                    <input
                     type="number" onChangeCapture={handleBusinessSeats}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of First Class Seats
                    </label>
                    <input
                     type="number" onChangeCapture={handleFirstSeats}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport
                    </label>
                    <input
                     type="text" onChangeCapture={handleDepatureAirport}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport
                    </label>
                    <input
                     type="text" onChangeCapture={handleArrivalAirport}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Economy Seat Price
                    </label>
                    <input
                     type="text" onChangeCapture={handleEconomySeatPrice}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Business Seat Price
                    </label>
                    <input
                     type="text" onChangeCapture={handleBusinessSeatPrice}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                 
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Class Seat Price
                    </label>
                    <input
                     type="text" onChangeCapture={handleFirstSeatPrice}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Baggage Allowance
                    </label>
                    <input
                     type="number" onChangeCapture={handleBaggageAllowance}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClickCapture={createFlight}
                    >
                      Create Flight
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
              <span>{flightCreated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);}
//ReactDOM.render(<createFlight/>,document.getElementById('root'));