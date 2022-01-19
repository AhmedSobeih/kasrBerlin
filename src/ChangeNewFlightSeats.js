import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest';
import './css/styles.css';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import session from "express-session";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
var flag=false;
const stripeTestPromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

export default function FlightSeats() {

  //location.state.priceDifference

     console.log("hoho")
     
    const navigate = useNavigate();
    const location = useLocation();

    var isUser = true;

        const [SeatsFirst, setSeatsFirst] = useState([]);
    const [SeatsBusiness, setSeatsBusiness] = useState([]);
    const [SeatsEconomy, setSeatsEconomy] = useState([]);
    const [DepartureFlight, setDepartureFlight] = useState(location.state.departureFlight);


    console.log((parseInt(location.state.priceDifference)))


  if(flag==false){
    if(location.state.Type=="Departure")
    {
         axios.get('/flightSeatsFirst')
    .then(res => {
      setSeatsFirst(res.data);
      
    });
    axios.get('/flightSeatsBusiness')
    .then(res => {
      setSeatsBusiness(res.data);
      
    });
     axios.get('/flightSeatsEconomy')
    .then(res => {
      setSeatsEconomy(res.data);
     
    });
    }
    else
    {
        axios.get('/returnFlightSeatsFirst')
        .then(res => {
          setSeatsFirst(res.data);
          axios.get('/returnFlightSeatsBusiness')
          .then(res => {
            setSeatsBusiness(res.data);
            
         axios.get('/returnFlightSeatsEconomy')
         .then(res => {
           setSeatsEconomy(res.data);
         });
          });
        });
       
    }
flag=true;
  }
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

    
function confirmSeats() {

    const checkboxes = document.querySelectorAll(`input:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.id);
    });
    var bodyFormData = new FormData();
    bodyFormData.append('ReservationNumber', location.state.reservation.ReservationNumber);
     //done
    axios({
        method: "delete",
        url: "/reservation",
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
        data: bodyFormData,
      })
    if(location.state.Type=="Departure")
    {//done
        axios({
            method: "get",
            url: '/flight/'+ location.state.reservation.ArrivalFlightFlightNumber,
            headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
          })
        .then((res)=>{
        var returnPrice =0;
        if(location.state.reservation.ReturnCabinClass == "Economy Class")
            returnPrice = location.state.reservation.ArrivalFlightSeats.length * res.data.EconomySeatPrice;
        if(location.state.reservation.ReturnCabinClass == "Business Class")
            returnPrice = location.state.reservation.ArrivalFlightSeats.length * res.data.BusinessSeatPrice;    
        if(location.state.reservation.ReturnCabinClass == "First Class")
            returnPrice = location.state.reservation.ArrivalFlightSeats.length * res.data.FirstSeatPrice;
        res.data.FlightPrice= returnPrice;
        var bodyFormData = new FormData();
      bodyFormData.append('FlightNumber',  res.data.FlightNumber);
      bodyFormData.append('DepatureDate',  res.data.DepatureDate);
      bodyFormData.append('ArrivalDate',  res.data.ArrivalDate);
      bodyFormData.append('FreeEconomySeatsNum',  res.data.FreeEconomySeatsNum);
      bodyFormData.append('FreeBusinessSeatsNum',  res.data.FreeBusinessSeatsNum);
      bodyFormData.append('FreeFirstSeatsNum',  res.data.FreeFirstSeatsNum);
      bodyFormData.append('DepatureAirport',  res.data.DepatureAirport);
      bodyFormData.append('ArrivalAirport',  res.data.ArrivalAirport);
      bodyFormData.append('CabinClass',  location.state.reservation.ReturnCabinClass);
      bodyFormData.append('FlightPrice',  res.data.FlightPrice);
      bodyFormData.append('BaggageAllowance',  res.data.BaggageAllowance);
      bodyFormData.append('seats', location.state.reservation.ArrivalFlightSeats );
      var duration = durationCalculation(res.data.DepatureDate,res.data.ArrivalDate).hour + " hours, "  + durationCalculation(res.data.DepatureDate,res.data.ArrivalDate).min + " minutes";
      bodyFormData.append('TripDuration', duration );



      
      //done
      axios({
        method: "post",
        url: "/returnFlight",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" , "Authorization":"Bearer "+ accessToken },
      })

    //   axios({
    //     method: "post",
    //     url: "/reserveReturnSeats",
    //     data: bodyFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
      var bodyFormData3 = new FormData();
      bodyFormData3.append('values',  values);
      //done
      axios({
        method: "post",
        url: "/setDepSeats",
        data: bodyFormData3,
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
      })
      
      
      var bodyFormData2 = new FormData();
      bodyFormData2.append('values', values);
      console.log(values);
      //done
      axios({
        method: "post",
        url: "/reserveSeats",
        data: bodyFormData2,
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            
            console.log(response.data)
        })
        bodyFormData2 = new FormData();
        bodyFormData2.append('values', location.state.reservation.ArrivalFlightSeats);
        
      axios({
        method: "post",
        url: "/reserveReturnSeats",
        data: bodyFormData2,
        headers: { "Content-Type": "multipart/form-data" ,"Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
          
            console.log(response.data)
    
        })
        axios({
            method: "get",
            url: '/reserveFlight',
            headers: { "Content-Type": "multipart/form-data" ,"Authorization":"Bearer "+ accessToken },
          })    
        
    })
   
    }
    else
    {
        axios.get('/flight/'+ location.state.reservation.DepatureFlightFlightNumber)
        .then((res)=>{
        var departurePrice =0;
        if(location.state.reservation.DepartureCabinClass == "Economy Class")
            departurePrice = location.state.reservation.ArrivalFlightSeats.length * res.data.EconomySeatPrice;
        if(location.state.reservation.DepartureCabinClass == "Business Class")
            departurePrice = location.state.reservation.ArrivalFlightSeats.length * res.data.BusinessSeatPrice;    
        if(location.state.reservation.DepartureCabinClass == "First Class")
            departurePrice = location.state.reservation.ArrivalFlightSeats.length * res.data.FirstSeatPrice;
        res.data.FlightPrice= departurePrice;
        var bodyFormData = new FormData();
      bodyFormData.append('FlightNumber',  res.data.FlightNumber);
      bodyFormData.append('DepatureDate',  res.data.DepatureDate);
      bodyFormData.append('ArrivalDate',  res.data.ArrivalDate);
      bodyFormData.append('FreeEconomySeatsNum',  res.data.FreeEconomySeatsNum);
      bodyFormData.append('FreeBusinessSeatsNum',  res.data.FreeBusinessSeatsNum);
      bodyFormData.append('FreeFirstSeatsNum',  res.data.FreeFirstSeatsNum);
      bodyFormData.append('DepatureAirport',  res.data.DepatureAirport);
      bodyFormData.append('ArrivalAirport',  res.data.ArrivalAirport);
      bodyFormData.append('CabinClass',  location.state.reservation.DepartureCabinClass);
      bodyFormData.append('FlightPrice',  res.data.FlightPrice);
      bodyFormData.append('BaggageAllowance',  res.data.BaggageAllowance);
      bodyFormData.append('seats', location.state.reservation.ArrivalFlightSeats );
      var duration = durationCalculation(res.data.DepatureDate,res.data.ArrivalDate).hour + " hours, "  + durationCalculation(res.data.DepatureDate,res.data.ArrivalDate).min + " minutes";
      bodyFormData.append('TripDuration', duration );
      


      
      
      axios({
        method: "post",
        url: "/departureFlight",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })

    //   axios({
    //     method: "post",
    //     url: "/reserveReturnSeats",
    //     data: bodyFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
      var bodyFormData3 = new FormData();
      bodyFormData3.append('values',  values);

      axios({
        method: "post",
        url: "/setReturnSeats",
        data: bodyFormData3,
        headers: { "Content-Type": "multipart/form-data" },
      })
      
      
      var bodyFormData2 = new FormData();
      bodyFormData2.append('values', location.state.reservation.DepatureFlightSeats);
      console.log(values);
      
      axios({
        method: "post",
        url: "/reserveSeats",
        data: bodyFormData2,
        headers: { "Content-Type": "multipart/form-data" ,"Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            
            console.log(response.data)
        })
        bodyFormData2 = new FormData();
        bodyFormData2.append('values', values);
       
      axios({
        method: "post",
        url: "/reserveReturnSeats",
        data: bodyFormData2,
        headers: { "Content-Type": "multipart/form-data" ,"Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
          
            console.log(response.data)
    
        })
        axios({
            method: "get",
            url: '/reserveFlight',
            headers: { "Content-Type": "multipart/form-data" ,"Authorization":"Bearer "+ accessToken },
          })
          
          /*.then(()=>{
            navigate('/Itinerary');
          })     */

          
        
    })  
    }
       



    // var bodyFormData = new FormData();
    // bodyFormData.append('values', values);
  
    //      axios({
    //         method: "post",
    //         url: "/setDepSeats",
    //         data: bodyFormData,
    //         headers: { "Content-Type": "multipart/form-data" },
    //       })
    //     navigate('/newDepFlightSeats',{state: {departureFlight:DepartureFlight, departureSeats: values}});
     }

    const CheckoutForm = () => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    confirmSeats();
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
    

      try {
        const { id } = paymentMethod;
        var bodyFormData = new FormData();
        bodyFormData.append('amount', ((parseInt(location.state.priceDifference))*100)+100);
        bodyFormData.append('id', id);
        const response = await axios( {
          method: "post",
          url: "/stripe/charge",
          data: bodyFormData,
          headers: {"Authorization":"Bearer "+ accessToken },
        }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          navigate('/Itinerary');
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };



  return (


      <div>
   <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                   Credit card payment
                    </h6>
                </div>
                
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
               
                <form onSubmit={handleSubmit}>
                  <div >
                   <h1>Card</h1>
                          {console.log("hii")}
                          <CardElement/>

                  </div>

                  

                  <div className="text-center mt-6">
                    <button onClick={ handleSubmit}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                    >
                      Confirm and Pay  
                    </button>
                  </div>
                </form>
              </div>
            </div> 

           
          </div>
          
        </div>

      </div>

          
    </div>
  );
};  
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





const Subscriptions=({plan})=>{
    return (<div className="col-lg-6 col-xl-4">
          <div className="card mb-5 mb-xl-0">
              <div className="card-body p-5">
                  <div className="small text-uppercase fw-bold text-muted">{plan}</div>
                  <div className="mb-3">
                  </div>
                  <ul className="list-unstyled mb-4">
                      <li className="mb-2">
                          <div class="xcontainer">
                              <div class="image">
                                  <img src="Exit.png"></img></div>
                                  <div>
                                      <h1 class="xtext">Exit</h1>
                                  </div>
                                </div>
                      </li>
                      <li className="mb-2">
                          <div class="xcontainer">
                              <div class="image">
                                  <img src="Available.png"></img></div>
                                  <div >
                                      <h1 class="xtext">Available</h1>
                                  </div>
                                </div>
                      </li>
                      <li className="mb-2">
                          <div class="xcontainer">
                              <div class="image">
                                  <img src="Reserved.png"></img></div>
                                  <div>
                                      <h1 class="xtext">Reserved</h1>
                                  </div>
                                </div>
                             </li>
                      <li className="mb-2">
                          <div class="xcontainer">
                              <div class="image">
                                  <img src="Chosen.png"></img></div>
                                  <div>
                                      <h1 class="xtext">Chosen</h1>
                                  </div>
                                </div>
                      </li>
                     
                  </ul>
              </div>
          </div>
      </div>);

}







  return (




    <>
       
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <a className="navbar-brand" href="#!">Start Bootstrap</a>
                
                <div className="collapse navbar-collapse" id="navلآbbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Services</a></li>
                    </ul>
                </div>
            </div>
        </nav>

    <section className="bg-light py-5 border-bottom">
            <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                    <Subscriptions  plan="Seat Guide" />
                </div>
            </div>
    </section>
        
   
        
    <div class="plane">
        <div class="cockpit">
            <h1>Reserve Your Seat</h1>
        </div>
        <div class="exit exit--front fuselage">
        </div>
        <ol class="cabin fuselage">
            <div class="container">
                <div class="row">
                    <h3 > First class seats</h3>
             {SeatsFirst.map((fl,index) => 
                                    ( (!fl) && (<div class="col-lg-3">
                                                    <li class="seat">
                                                        <input type="checkbox" id={index+1} />
                                                        <label for={index+1}>{index+1}</label>
                                                    </li>
                                                </div>
                                            )
                                    )
                                    ||
                                    
                                        ( (fl) && (<div class="col-lg-3">
                                                        <li class="seat">
                                                            <input type="checkbox" disabled id={index+1} />
                                                            <label for={index+1}>{index+1}</label>
                                                        </li>

                                                    </div>
                                                )
                                    )
                      
                     )
                    } 
                    <h3>  Business seats</h3>
             {SeatsBusiness.map((fl,index) => 
                                    ( (!fl) && (<div class="col-lg-3">
                                                    <li class="seat">
                                                        <input type="checkbox" id={index+SeatsFirst.length+1} />
                                                        <label for={index+SeatsFirst.length+1}>{index+SeatsFirst.length+1}</label>
                                                    </li>
                                                </div>
                                            )
                                    )
                                    ||
                                    
                                        ( (fl) && (<div class="col-lg-3">
                                                        <li class="seat">
                                                            <input type="checkbox" disabled id={index+SeatsFirst.length+1} />
                                                            <label for={index+SeatsFirst.length+1}>{index+SeatsFirst.length+1}</label>
                                                        </li>

                                                    </div>
                                                )
                                    )
                      
                     )
                    } 
                    <h3> Economy seats</h3>
             {SeatsEconomy.map((fl,index) => 
                                    ( (!fl) && (<div class="col-lg-3">
                                                    <li class="seat">
                                                        <input type="checkbox" id={index+SeatsFirst.length+SeatsBusiness.length+1} />
                                                        <label for={index+SeatsFirst.length+SeatsBusiness.length+1}>{index+SeatsFirst.length+SeatsBusiness.length+1}</label>
                                                    </li>
                                                </div>
                                            )
                                    )
                                    ||
                                    
                                        ( (fl) && (<div class="col-lg-3">
                                                        <li class="seat">
                                                            <input type="checkbox" disabled id={index+SeatsFirst.length+SeatsBusiness.length+1} />
                                                            <label for={index+SeatsFirst.length+SeatsBusiness.length+1}>{index+SeatsFirst.length+SeatsBusiness.length+1}</label>
                                                        </li>

                                                    </div>
                                                )
                                    )
                      
                     )
                    } 
                   
                   

                </div>
             </div>
        </ol>
        <div class="exit exit--back fuselage">
        </div>
    </div>
    {isUser&&<Elements stripe={stripeTestPromise}>
                     <CheckoutForm />
                 </Elements>}
                 {!isUser&&<h1>Sorry you must login first To reserve and pay</h1>}
        
   </>
   
  );



}




/**/ 