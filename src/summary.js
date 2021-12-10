import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import Navbar from 'Navbar';

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
    const navigate = useNavigate();

    const [FlightCreated, setFlightCreated] = useState("");
    const [FlightNumber, setFlightNumber] = useState(flight);
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
    const [DepatureDate, setDepatureDate] = useState("");
    const [ArrivalDate, setArrivalDate] = useState("");
    const [EconomySeats, setEconomySeats] = useState("");
    const [BusinessSeats, setBusinessSeats] = useState("");
    const [DepatureAirport, setDepatureAirport] = useState("");
    const [ArrivalAirport, setArrivalAirport] = useState("");

    const [departureFlight, setDepartureFlight] = useState({});

    const CancelToken = axios.CancelToken;
    let cancel;

  
    console.log(1);
    axios.get('/flight/'+flight)
    .then(res => {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
      
      setDepatureDate(dateConversion(res.data.DepatureDate));
      setArrivalDate(dateConversion(res.data.ArrivalDate));
      setEconomySeats(res.data.EconomySeats);
      setBusinessSeats(res.data.BusinessSeats);
      setDepatureAirport(res.data.DepatureAirport);
      setArrivalAirport(res.data.ArrivalAirport);
      cancel();
  
    })
    .catch(function (error) {
        console.log(error);
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
  
    function changeReturnFlight (){

      var bodyFormData = new FormData();
      bodyFormData.append('FlightNumber', FlightNumber);
      bodyFormData.append('DepatureDate', DepatureDate);
      bodyFormData.append('ArrivalDate', ArrivalDate);
      bodyFormData.append('EconomySeats', EconomySeats);
      bodyFormData.append('BusinessSeats', BusinessSeats);
      bodyFormData.append('DepatureAirport', DepatureAirport);
      bodyFormData.append('ArrivalAirport', ArrivalAirport);
      console.log(FlightNumber);
    
      axios({
        method: "post",
        url: "/returnFlight",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then((response) => { 
            console.log(response.data);
            var bodyFormData2 = new FormData();
            bodyFormData2.append('DepatureAirport', ArrivalAirport);
            bodyFormData2.append('ArrivalAirport', DepatureAirport);
          

          axios({
            method: "post",
            url: "/searchFlight",
            data: bodyFormData2,
            headers: { "Content-Type": "multipart/form-data" },
          })
             
            })
          }
          axios.get('/departureFlight')
         .then(res => {
    
            setDepartureFlight(res.data);
  
    })
  
  
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
                 
                <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Departure Flight Details</h1>
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
                    <div>{departureFlight.FlightNumber}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Date & Time
                    </label>
                    <div>{departureFlight.DepatureDate}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date & Time
                    </label>
                    <div>{departureFlight.ArrivalDate}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Economy Seats
                    </label>
                    <div>{departureFlight.EconomySeats}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Business Seats
                    </label>
                  <div>{departureFlight.BusinessSeats}</div>
                  </div><div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport
                    </label>
                    <div>{departureFlight.DepatureAirport}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport
                    </label>
                    <div>{departureFlight.ArrivalAirport}</div>

                  </div>
                  <div className="text-center mt-6">
                   
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
      <div className="container mx-auto px-4">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
                <div className="btn-wrapper text-center">
                 </div>
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                 
                <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Return Flight Details</h1>
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
                    <div>{FlightNumber}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Date & Time
                    </label>
                    <div>{DepatureDate}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date & Time
                    </label>
                    <div>{ArrivalDate}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Economy Seats
                    </label>
                    <div>{EconomySeats}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Business Seats
                    </label>
                  <div>{BusinessSeats}</div>
                  </div><div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport
                    </label>
                    <div>{DepatureAirport}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport
                    </label>
                    <div>{ArrivalAirport}</div>

                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {(e) =>{ e.preventDefault();
                        if (window.confirm("You must be logged in to confirm the trip")) {
                        navigate('/login');

                      } else {
                        
                        }
                        
                            }}
                    >
                      Confirm trip
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