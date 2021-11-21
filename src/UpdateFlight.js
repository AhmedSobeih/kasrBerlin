import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
export default function UpdateFlight(){

    const [flightCreated, setFlightCreated] = useState("");
    const [flightNumber, setFlightNumber] = useState("110");
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
    const [depatureDate, setDepatureDate] = useState("2021-11-10T02:32");
    const [arrivalDate, setArrivalDate] = useState("2021-11-10T16:32");
    const [economySeats, setEconomySeats] = useState(10);
    const [businessSeats, setBusinessSeats] = useState(500);
    const [depatureAirport, setDepatureAirport] = useState("BER");
    const [arrivalAirport, setArrivalAirport] = useState("BAR");


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
function updateFlight (){

    var bodyFormData = new FormData();
    bodyFormData.append('flightNumber', flightNumber);
    bodyFormData.append('depatureDate', depatureDate);
    bodyFormData.append('arrivalDate', arrivalDate);
    bodyFormData.append('economySeats', economySeats);
    bodyFormData.append('businessSeats', businessSeats);
    bodyFormData.append('depatureAirport', depatureAirport);
    bodyFormData.append('arrivalAirport', arrivalAirport);
  
  
  axios({
    method: "post",
    url: "/flight",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
      .then((response) => { 
        console.log(response.data)
        if(response.data==false)
        setFlightCreated('Flight cannot created!');
        else
        setFlightCreated('Flight created successfully');
    })
  }
  function handleFlightNumber(number){
    setFlightNumber(number.target.value);
    console.log(flightNumber);
  }
  function handleDepatureDate(date){
    setDepatureDate(date.target.value);
    console.log(depatureDate);
  }
  function handleArrivalDate(date){
    setArrivalDate(date.target.value);
    console.log(arrivalDate);
  }
  function handleEconomySeats(number){
    setEconomySeats(number.target.value);
    console.log(economySeats);
  }
  function handleBusinessSeats(text){
    setBusinessSeats(text.target.value);
    console.log(businessSeats);
  }
  function handleDepatureAirport(text){
    setDepatureAirport(text.target.value);
    console.log(depatureAirport);
  }
  function handleArrivalAirport(text){
    setArrivalAirport(text.target.value);
    console.log(arrivalAirport);
  }
  

  
return(


<>
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
                   <h1>Update Flight</h1>
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
                     type="number" onChangeCapture={handleFlightNumber}  defaultValue={flightNumber}
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
                     type="datetime-local" onChangeCapture = {handleDepatureDate} onPointerMove={handleDepatureDate} defaultValue={depatureDate}
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
                     type="datetime-local" onChangeCapture = {handleArrivalDate} onPointerMove= {handleArrivalDate} defaultValue={arrivalDate}
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
                     type="number" onChangeCapture={handleEconomySeats} defaultValue={economySeats}
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
                     type="number" onChangeCapture={handleBusinessSeats} defaultValue={businessSeats}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div><div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport
                    </label>
                    <input
                     type="text" onChangeCapture={handleDepatureAirport} defaultValue={depatureAirport}
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
                     type="text" onChangeCapture={handleArrivalAirport} defaultValue={arrivalAirport}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  
                    >
                      Update Flight
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
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);}
//ReactDOM.render(<createFlight/>,document.getElementById('root'));