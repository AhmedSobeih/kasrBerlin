import React, {useState,useEffect} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate, useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest';


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
    const location = useLocation();


    const [FlightCreated, setFlightCreated] = useState("");
    const [FlightNumber, setFlightNumber] = useState(flight);
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
  
  

    const [SearchCriteria, setSearchCriteria] = useState("");
    const [DepartureFlightVisibility, setDepartureFlightVisibility] = useState("true");
    const [departureFlight, setDepartureFlight] = useState(location.state.departureFlight);
    const [returnFlight, setReturnFlight] = useState(location.state.returnFlight);
    const [isUser, setIsUser] = useState(false);







    const CancelToken = axios.CancelToken;
    let cancel;
    axios.get('/session')
    .then(res => {
      if(res.data==false)
        setIsUser(false);
      else
        setIsUser(true);
    })
    axios.get('/userCriteria')
    .then(res => {
        setSearchCriteria(res.data);

  
    // axios.get('/flight/'+flight)
    // .then(res => {
    //   cancelToken: new CancelToken(function executor(c) {
    //     // An executor function receives a cancel function as a parameter
    //     cancel = c;
    //   })


      

 
  
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
function showDepartureFlight(e)  {
  const checked = e.target.checked;
  if (checked) { 
   setDepartureFlightVisibility(false);
  } else {
    setDepartureFlightVisibility(true);
  }
};
  
    function changeReturnFlight (){

      var bodyFormData = new FormData();
      bodyFormData.append('FlightNumber', returnFlight.FlightNumber);
      bodyFormData.append('DepatureDate', returnFlight.DepatureDate);
      bodyFormData.append('ArrivalDate', returnFlight.ArrivalDate);
      bodyFormData.append('FreeEconomySeatsNum', returnFlight.FreeEconomySeatsNum);
      bodyFormData.append('FreeBusinessSeatsNum', returnFlight.FreeBusinessSeatsNum);
      bodyFormData.append('FreeFirstSeatsNum', returnFlight.FreeFirstSeatsNum);
      bodyFormData.append('DepatureAirport', returnFlight.DepatureAirport);
      bodyFormData.append('ArrivalAirport', returnFlight.ArrivalAirport);
      bodyFormData.append('TripDuration', returnFlight.TripDuration);
      bodyFormData.append('CabinClass', returnFlight.CabinClass);
      bodyFormData.append('FlightPrice', returnFlight.FlightPrice);
      bodyFormData.append('BaggageAllowance', returnFlight.BaggageAllowance);


      console.log("REEEEEEEEEEEEEEEEETTTTTTTTTTTTTTTT");
      
      
      axios({
        method: "post",
        url: "/returnFlight",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then((response) => { 
            console.log(response.data);
           
       
             
            })

         

      }
    //   axios.get('/departureFlight')
    //      .then(res => {
    
    //         setDepartureFlight(res.data);
  
    // })

    useEffect(() => {

      console.log("KKKKKKKKKKKK");
      console.log(location.state.returnFlight);
      var s = durationCalculation(returnFlight.DepatureDate,returnFlight.ArrivalDate).hour + " hours, " + durationCalculation(returnFlight.DepatureDate,returnFlight.ArrivalDate).min + " minutes";

      returnFlight.TripDuration=s;

    }, [])    


    function durationCalculation(departureDate, arrivalDate){
      var departureYear = "";
      var arrivalYear ="";
      for(let i=0;i<4; i++)
      {
          departureYear += departureDate.charAt(i);
          arrivalYear += arrivalDate.charAt(i);
      }
      departureYear = parseInt(departureYear);
      arrivalYear = parseInt(arrivalYear);
  
      var departureMonth = "";
      var arrivalMonth ="";
      for(let i=5;i<7; i++)
      {
          departureMonth += departureDate.charAt(i);
          arrivalMonth += arrivalDate.charAt(i);
      }
      departureMonth = parseInt(departureMonth);
      arrivalMonth = parseInt(arrivalMonth);
  
      var departureDay = "";
      var arrivalDay ="";
  
      for(let i=8;i<10; i++)
      {
          departureDay += departureDate.charAt(i);
          arrivalDay += arrivalDate.charAt(i);
      }
      departureDay = parseInt(departureDay);
      arrivalDay = parseInt(arrivalDay);
  
      var departureHour = "";
      var arrivalHour ="";
  
      for(let i=11;i<13; i++)
      {
          departureHour += departureDate.charAt(i);
          arrivalHour += arrivalDate.charAt(i);
      }
      departureHour = parseInt(departureHour);
      arrivalHour = parseInt(arrivalHour);
  
  
      var departureMin = "";
      var arrivalMin ="";
  
      for(let i=14;i<16; i++)
      {
          departureMin += departureDate.charAt(i);
          arrivalMin += arrivalDate.charAt(i);
      }
      departureMin = parseInt(departureMin);
      arrivalMin = parseInt(arrivalMin);
  
  
      const date2 = new Date(arrivalYear, arrivalMonth, arrivalDay, arrivalHour, arrivalMin);
      const date1 = new Date(departureYear,departureMonth,departureDay,departureHour,departureMin);
      var diff = date2.valueOf() - date1.valueOf();
      var diffInHours = diff/1000/60/60;
      var min = diffInHours - Math.trunc(diffInHours);
      min = Math.ceil((min *60));
      const result = {
          hour: Math.trunc(diffInHours),
          min : min
      }
      return result;
    }
  
  
return(


<>
{isUser&&Navbar()};
{!isUser&&NavbarGuest()};

      <div className="container mx-auto px-4">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
             <h1>Show Departure Flight Details</h1>
                    <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showDepartureFlight(e);
                            }}
                            ></input>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"  hidden={DepartureFlightVisibility}>
              <div className="rounded-t mb-0 px-6 py-6">
                
              <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Departure Flight Details</h1>
                </div>
                <div className="btn-wrapper text-center" >
                 </div>
                </div>
                 <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                 
                 <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   
                 </div>
                 <hr className="mt-6 border-b-1 border-blueGray-300" />
                 
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
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Trip Duration
                     </label>
                     <div>{departureFlight.TripDuration}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Cabin Class
                     </label>
                     <div>{departureFlight.CabinClass}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Baggage Allowance
                     </label>
                     <div>{departureFlight.BaggageAllowance}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Total Flight Price 
                     </label>
                     <div>{departureFlight.FlightPrice}</div>
 
                   </div>
                   <div className="text-center mt-6">
                    
 
                   </div>
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
                 
                 <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Flight Number
                     </label>
                     <div>{returnFlight.FlightNumber}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Depature Date & Time
                     </label>
                     <div>{returnFlight.DepatureDate}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Arrival Date & Time
                     </label>
                     <div>{returnFlight.ArrivalDate}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Depature Airport
                     </label>
                     <div>{returnFlight.DepatureAirport}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Arrival Airport
                     </label>
                     <div>{returnFlight.ArrivalAirport}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Trip Duration
                     </label>
                     <div>{returnFlight.TripDuration}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Cabin Class
                     </label>
                     <div>{returnFlight.CabinClass}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Baggage Allowance
                     </label>
                     <div>{returnFlight.BaggageAllowance}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Total Flight Price
                     </label>
                     <div>{returnFlight.FlightPrice}</div>
 
                   </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {(e) =>{ e.preventDefault();
                      //   if (window.confirm("You must be logged in to confirm the trip")) {
                      //   navigate('/login');

                      // } else {
                        
                      //   }
                      changeReturnFlight();
                      navigate('/FlightSeats',  {state: {departureFlight:departureFlight, returnFlight: returnFlight}});
                        
                            }}
                    >
                      Confirm Return Flight
                    </button>
                  </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
             
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