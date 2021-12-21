import React, {useState} from "react";

import ReactDOM from 'react-dom';
import './css/styles.css';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';
import Navbar from 'Navbar';

import axios from 'axios';

// components

const Anchor =({title})=>{
        return (
            <li className="nav-item">
              
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };

export default function FlightbyNumber() {


  const [flightCreated, setFlightCreated] = useState("");
  const [flightNumber, setFlightNumber] = useState("110");
  const [depatureDate, setDepatureDate] = useState("2021-11-02T00:00:00.000Z");
  const [arrivalDate, setArrivalDate] = useState("2021-11-11T00:00:00.000Z");
  const [economySeats, setEconomySeats] = useState(10);
  const [businessSeats, setBusinessSeats] = useState(500);
  const [depatureAirport, setDepatureAirport] = useState("BER");
  const [arrivalAirport, setArrivalAirport] = useState("BAR");

  function createFlight (){
    console.log(1);

    var bodyFormData = new FormData();
    bodyFormData.append('flightNumber', flightNumber);
    bodyFormData.append('depatureDate', depatureDate);
    bodyFormData.append('arrivalDate', arrivalDate);
    bodyFormData.append('economySeats', economySeats);
    bodyFormData.append('businessSeats', businessSeats);
    bodyFormData.append('depatureAirport', depatureAirport);
    bodyFormData.append('arrivalAirport', arrivalAirport);


axios({
  method: "get",
  url: "/flight/:number",
  data: bodyFormData,
  headers: { "Content-Type": "multipart/form-data" },
})
    .then((response) => { 
      console.log(response);
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

  return (
    <>
  {Navbar()};
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
                   <h1>Flight Details</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Flight Number: {flightNumber}
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Date & Time: {depatureDate}
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date & Time: {arrivalDate}
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Economy Seats: {economySeats}
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Business Seats: {businessSeats}
                    </label>
                  </div><div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport: {depatureAirport}
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport: {arrivalAirport}
                    </label>
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
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
