import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
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

    const [FlightCreated, setFlightCreated] = useState("");
    const [FlightNumber, setFlightNumber] = useState(flight);
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
    const [DepatureDate, setDepatureDate] = useState("");
    const [ArrivalDate, setArrivalDate] = useState("");
    const [FreeEconomySeatsNum, setFreeEconomySeatsNum] = useState("");
    const [FreeBusinessSeatsNum, setFreeBusinessSeatsNum] = useState("");
    const [FreeFirstSeatsNum, setFreeFirstSeatsNum] = useState("");
    const [DepatureAirport, setDepatureAirport] = useState("");
    const [ArrivalAirport, setArrivalAirport] = useState("");
    const [TripDuration, setTripDuration] = useState("");
    const [CabinClass, setCabinClass] = useState("");
    const [BaggageAllowance, setBaggageAllowance] = useState("");
    const [FlightPrice, setFlightPrice] = useState("");
    const [SearchCriteria, setSearchCriteria] = useState("");
    const [DepartureFlightVisibility, setDepartureFlightVisibility] = useState("true");
    const [isUser, setIsUser] = useState(false);






    const [departureFlight, setDepartureFlight] = useState({});

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
      })

  
    axios.get('/flight/'+flight)
    .then(res => {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
      
      setDepatureDate(dateConversion(res.data.DepatureDate));
      setArrivalDate(dateConversion(res.data.ArrivalDate));
      setFreeEconomySeatsNum(res.data.FreeEconomySeatsNum);
      setFreeBusinessSeatsNum(res.data.FreeBusinessSeatsNum);
      setFreeFirstSeatsNum(res.data.FreeFirstSeatsNum);

      setDepatureAirport(res.data.DepatureAirport);
      setArrivalAirport(res.data.ArrivalAirport);
      setCabinClass(departureFlight.CabinClass);
      var s = durationCalculation(res.data.DepatureDate,res.data.ArrivalDate).hour + " hours, " + durationCalculation(res.data.DepatureDate,res.data.ArrivalDate).min + " minutes";

      setTripDuration(s);
      setBaggageAllowance(res.data.BaggageAllowance);
      if(SearchCriteria.CabinClass=="Economy Class")
      setFlightPrice( parseInt(res.data.EconomySeatPrice)*(parseInt(SearchCriteria.NumberOfAdults)+parseInt(SearchCriteria.NumberOfChildren)));
    if(SearchCriteria.CabinClass=="Business Class")
    setFlightPrice(parseInt(res.data.BusinessSeatPrice)*(parseInt(SearchCriteria.NumberOfAdults)+parseInt(SearchCriteria.NumberOfChildren)));
    if(SearchCriteria.CabinClass=="First Class")
    setFlightPrice(parseInt(res.data.FirstSeatPrice)*(parseInt(SearchCriteria.NumberOfAdults)+parseInt(SearchCriteria.NumberOfChildren)));
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
      bodyFormData.append('FlightNumber', FlightNumber);
      bodyFormData.append('DepatureDate', DepatureDate);
      bodyFormData.append('ArrivalDate', ArrivalDate);
      bodyFormData.append('FreeEconomySeatsNum', FreeEconomySeatsNum);
      bodyFormData.append('FreeBusinessSeatsNum', FreeBusinessSeatsNum);
      bodyFormData.append('FreeFirstSeatsNum', FreeFirstSeatsNum);
      bodyFormData.append('DepatureAirport', DepatureAirport);
      bodyFormData.append('ArrivalAirport', ArrivalAirport);
      bodyFormData.append('TripDuration', TripDuration);
      bodyFormData.append('CabinClass', CabinClass);
      bodyFormData.append('FlightPrice', FlightPrice);

      bodyFormData.append('BaggageAllowance', BaggageAllowance);



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
          
       
             
            })

         

      }
      axios.get('/departureFlight')
         .then(res => {
    
            setDepartureFlight(res.data);
  
    })



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
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Trip Duration
                     </label>
                     <div>{TripDuration}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Cabin Class
                     </label>
                     <div>{CabinClass}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Baggage Allowance
                     </label>
                     <div>{BaggageAllowance}</div>
 
                   </div>
                   <div className="relative w-full mb-3">
                     <label
                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                       htmlFor="grid-password"
                     >
                       Total Flight Price
                     </label>
                     <div>{FlightPrice}</div>
 
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
                      navigate('/FlightSeats');
                        
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