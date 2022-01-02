import React, {useState,useEffect} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import session from "express-session";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


//const PUBLIC_KEY = "pk_test_51KD72pKQG3BZSLH4DXKU0bkh6gymwLK6kw3ciOYl1m0pqzrXlT5fZe9cG6wBPBEpKGUpnCZu5HFYB80A5JudoXCy00tvq5YESz";

const stripeTestPromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);
console.log(process.env.REACT_APP_PUBLIC_KEY);
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
    const [price,setPrice]=useState(0);
    const [ReturnFlight, setReturnFlight] = useState(location.state.returnFlight);
    const [isUser, setIsUser] = useState(false);


      useEffect(() => {
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
      console.log(res.data)
      if(res.data===false)
      {
        if (window.confirm("You must be logged in to reserve a flight. Do you want to login?")) {
          navigate('/login');

       } else {
         
         }
      }
      else{
        axios.get('/reserveFlight')
        var bodyFormData = new FormData();
        bodyFormData.append('values', location.state.departureSeats);
      
      axios({
        method: "post",
        url: "/reserveSeats",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then((response) => { 
            
            console.log(response.data)
        })
        bodyFormData = new FormData();
        bodyFormData.append('values', location.state.returnSeats);
      
      axios({
        method: "post",
        url: "/reserveReturnSeats",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then((response) => { 
          
            console.log(response.data)
    
        })
       
        navigate('/Itinerary');

      }
    })
    
            


  }
    axios.get('/totalPrice')
      .then(res => {
        console.log(parseInt(res.data));
        setPrice(parseInt(res.data));
      })
  const CheckoutForm = () => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    reserveFlight();
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
     
      try {
        const { id } = paymentMethod;
        const response = await axios.post( "/stripe/charge",
          {
            amount:(price*100),
            id: id
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
                          <CardElement />

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
      <td>{location.state.departureSeats.map((seat) => <span className="mr-2">{seat}   </span>)} 
      </td>
      <td>{location.state.returnSeats.map((seat) => <span className="mr-2">{seat}   </span>)} 
      </td>

    </tr>
  </tbody>
</table>
 
<div className="text-blueGray-8000 text-center mb-8 font-bold">
                   <h1>Total Price = {parseInt(DepartureFlight.FlightPrice)+parseInt(ReturnFlight.FlightPrice)}</h1>
                </div>
                
               </div>
            </div>
           
          </div>
        </div>
      </div>
      <Elements stripe={stripeTestPromise}>
                     <CheckoutForm />
                 </Elements>
    </>
);}
//ReactDOM.render(<createFlight/>,document.getElementById('root'));