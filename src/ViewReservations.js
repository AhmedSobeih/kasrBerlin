import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import {useParams,useNavigate, useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import UserHome from 'UserHome';
import configData from "./config.json";

var username;
let authorized = true;

export default function(props) {
  
  
    const navigate = useNavigate();
    const location = useLocation();
    const user = useParams().username;
    username = user;
    try{
      var accessToken = configData.PersonalAccessToken;
      var refreshToken = configData.PersonalRefreshToken;
      console.log(accessToken);
      var type = configData.Type;
      if(type == 0 || accessToken == null)
      {
          authorized = false;
      }
      }
      catch(err)
      {
          authorized = false;
      }

      useEffect(() => {
        if(authorized == false)
          navigate("/");
      }, [authorized]);
    return <ViewReservations navigate={navigate} location={location} accessToken= {accessToken} />;
  }

  function getUserName (){
    var accessToken = configData.PersonalAccessToken;
    // const data = { username, password}
    var bodyFormData = new FormData();
    console.log(configData.PersonalAccessToken);
    bodyFormData.append('username', username);
   axios({
    method: "get",
    url: "/session",
    data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            if(response.data.name == "TokenExpiredError" || response.data.name == "JsonWebTokenError")
              {
                authorized = false;
              }
            else
            {
              authorized = true;
              console.log(response.data);   
            }
                     
        })
        return username;
      }


const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };
function MyComponent() {
        useEffect(() => {
          // Runs ONCE after initial rendering
        }, []);
      }

class ViewReservations extends Component {

    constructor(props) {
        super(props);
        const location = this.props.location; 
        const navigate = this.props.navigate;
        const accessToken = this.props.accessToken
        this.state = { flightsCollection: [] };

    }
  
    async componentDidMount() {
      console.log("heererrrree");
      const navigate = this.props.navigate;
      var accessToken = this.props.accessToken;
      try{
        const location = this.props.location;   
        axios({
          method: "get",
          url: "/reservation",
          headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
        })
            .then(res => {
                console.log(res.data);

                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
      }
      catch(err)
      {
        console.log("I am here");
        this.props.navigate('/login');
        this.navToLogin();
        console.log(err);
      }
      
    }
    async navToLogin()
    {
      await this.props.navigate('/login');
    }
    gotoCancelReservation(deletedReservationNumber) {
        var bodyFormData = new FormData();
        var accessToken = this.props.accessToken;
        bodyFormData.append('ReservationNumber', deletedReservationNumber);
        axios({
            method: "delete",
            url: "/reservation",
            headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
            data: bodyFormData,
          })
              .then((response) => { 
                console.log(response.data)
                if(response.data==false){}
                else
                {this.componentDidMount() }
            })
        }
     

   
 
    render() {
        const  navigate  = this.props.navigate;

        return (









            
            <div className="wrapper-users">
 {Navbar()};
 <script>{getUserName()}</script>
<table class="table">
  <thead>
    <tr>
    <th scope="col">#</th>
      <th scope="col">Reservation Number</th>
      <th scope="col">Flight Type</th>
      <th scope="col">Flight Number</th>
      <th scope="col">Departure Date</th>
      <th scope="col">Arrival Date</th>
      <th scope="col">Departure Airport</th>
      <th scope="col">Arrival Airport</th>
      <th scope="col">Class</th>
      <th scope="col">Number of Seats</th>
      <th scope="col">Seats</th>
      <th scope="col">Price</th>

    </tr>
  </thead>
  
  <tbody>
      {this.state.flightsCollection.map((fl,index) => 
                            (

                                  <tr>

      <th scope="row">{index+1}</th>
      <td>{fl.ReservationNumber}</td>
      <td>Departure</td>
      <td>{fl.DepatureFlightFlightNumber}</td>
      <td>{fl.DepatureFlightDepatureDate}</td>
      <td>{fl.DepatureFlightArrivalDate}</td>
      <td>{fl.DepatureFlightDepatureAirport}</td>
      <td>{fl.DepatureFlightArrivalAirport}</td>
      <td>{fl.DepartureCabinClass}</td>

      <td>{fl.DepatureFlightSeats.length}</td>
      <td>[{fl.DepatureFlightSeats.join(",")}]</td>
      <td>{fl.Price}</td>

      <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                      onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to cancel the reservation for both departure and arrival flights?")) {
                            this.gotoCancelReservation(fl.ReservationNumber);
                            axios({
                              method: "get",
                              url: "/ViewReservations",
                              headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ this.props.accessToken },
                            })
                            .then(res => {
                              console.log(res.data)
                      }) 
                        
                        }
                    }}
                      
                    >
                      Cancel Reservation 
     </button> </td>
     <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                      onClick={(e) =>{ e.preventDefault();
                        var bodyFormData = new FormData();

                        bodyFormData.append('flightNumber', fl.DepatureFlightFlightNumber);
                        bodyFormData.append('CabinClass', fl.DepartureCabinClass);

                       axios({
                        method: "post",
                        url: "/departureFlightByNumber",
                        data: bodyFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                      })
                      .then((response) => { 
                        console.log("response");

                        console.log(response);
                        navigate('/changeSeats', {state: {ReservationNumber: fl.ReservationNumber, Type:"Departure", values: fl.DepatureFlightSeats}});

                      })

  
  
 
                        
                    }}
                      
                    >
                      Change seats
     </button> </td>
     <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                      onClick={(e) =>{ e.preventDefault();
                        axios.get('/flight/'+fl.DepatureFlightFlightNumber)
                        .then(res => {
                          navigate('/changeSearchFlight', {state: {reservation: fl, oldFlight:res.data, Type:"Departure"} })

                        });
                       
                       
                        
                    }}
                      
                    >
                      Change Flight
     </button> </td>
      <td>
     </td>
    </tr>
    
        )
        
                         )}
                         {this.state.flightsCollection.map((fl,index) => 
                            (
                                
                                  <tr>
      <th scope="row">{index+1}</th>
      <td>{fl.ReservationNumber}</td>
      <td>Arrival</td>
      <td>{fl.ArrivalFlightFlightNumber}</td>
      <td>{fl.ArrivalFlightDepatureDate}</td>
      <td>{fl.ArrivalFlightArrivalDate}</td>
      <td>{fl.ArrivalFlightDepatureAirport}</td>
      <td>{fl.ArrivalFlightArrivalAirport}</td>
      <td>{fl.ReturnCabinClass}</td>
      <td>{fl.ArrivalFlightSeats.length}</td>
      <td>[{fl.ArrivalFlightSeats.join(",")}]</td>
      <td>{fl.Price}</td>

      <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                      onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to cancel the reservation for both departure and arrival flights?")) {
                            this.gotoCancelReservation(fl.ReservationNumber);
                            axios({
                              method: "get",
                              url: "/ViewReservations",
                              headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ this.props.accessToken },
                            })
                            .then(res => {
                              console.log(res.data)
                      }) 
                        
                        }
                    }}
                      
                    >
                      Cancel Reservation 
     </button> </td>
     <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                      onClick={(e) =>{ e.preventDefault();

                        var bodyFormData = new FormData();

                        bodyFormData.append('flightNumber', fl.ArrivalFlightFlightNumber);
                        bodyFormData.append('CabinClass', fl.ReturnCabinClass);

                      
                       axios({
                        method: "post",
                        url: "/returnFlightByNumber",
                        data: bodyFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                      })
                      .then((response) => { 

                        navigate('/changeSeats', {state: {ReservationNumber: fl.ReservationNumber, Type:"Return", values:fl.DepatureFlightSeats}});

                      })
                        
                        
                    }}
                      
                    >
                      Change seats
     </button> </td>
     <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" 
                      onClick={(e) =>{ e.preventDefault();

                      axios.get('/flight/'+fl.ArrivalFlightFlightNumber)
                      .then(res => {
                        navigate('/changeSearchFlight', {state: {reservation: fl, oldFlight:res.data, Type:"Return"} })

                      });
                     
                        
                    }}
                      
                    >
                      Change Flight
     </button> </td>
      <td>
     </td>
    </tr>
    
        )
        
                         )}

  </tbody>
</table>




                {/* <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.flightsCollection.map((fl) => 
                            <h1> {fl.name} </h1>
                         )}
                        </tbody>
                    </table>
                </div>*/}
            </div> 
        )
    }
}