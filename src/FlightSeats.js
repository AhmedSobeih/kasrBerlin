
import React, {useState} from "react";

import ReactDOM from 'react-dom';
import './css/styles.css';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';

import axios from 'axios';
import {useParams,useNavigate,useLocation} from 'react-router-dom';

export default function FlightSeats() {
    const navigate = useNavigate();
    const location = useLocation();

    
function confirmSeats() {

    const checkboxes = document.querySelectorAll(`input:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.id);
    });


    var bodyFormData = new FormData();
    bodyFormData.append('values', values);
  
         axios({
            method: "post",
            url: "/setDepSeats",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
        navigate('/ReturnFlightSeats',{state: {departureFlight:DepartureFlight, returnFlight: ReturnFlight, departureSeats: values}});

  
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




    const [SeatsFirst, setSeatsFirst] = useState([]);
    const [SeatsBusiness, setSeatsBusiness] = useState([]);
    const [SeatsEconomy, setSeatsEconomy] = useState([]);
    const [DepartureFlight, setDepartureFlight] = useState(location.state.departureFlight);
    const [ReturnFlight, setReturnFlight] = useState(location.state.returnFlight);


    var isUser = true;
    // this uses Router based states to let us access cour state
      var accessToken = localStorage.getItem('acessToken');
      var refreshToken = localStorage.getItem('refreshToken');
      var type = localStorage.getItem('type');
       if(accessToken == null)
       {
           isUser = false;
       }
       if(type == 2)
        {
            isUser = false;
        }

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



  return (




    <div>
       
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

  
<div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {(e) =>{ e.preventDefault();
                      //   if (window.confirm("You must be logged in to confirm the trip")) {
                      //   navigate('/login');

                      // } else {
                        
                      //   }
                    confirmSeats();   
                    
                            }}
                    >
                      Confirm Seats
                    </button>
                  </div>        
        
   </div>
  );
}




