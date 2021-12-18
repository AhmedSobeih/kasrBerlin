
import React, {useState} from "react";

import ReactDOM from 'react-dom';
import './css/styles.css';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';

import axios from 'axios';



const Seats=({number})=>{
return(
    <div class="col-lg-3">
                    <li class="seat">
                        <input type="checkbox" id="1A" />
                        <label for="1A">{number}</label>
                    </li>

                    </div>
)

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



export default function FlightSeats() {
    const [Seats, setSeats] = useState([true,false,true,false,true]);

     /*axios.get('/flightSeatsFirst')
    .then(res => {
      setSeats(res.data);
    });*/
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
                    
             {Seats.map((fl,index) => 
                                    ( fl && (<div class="col-lg-3">
                                                    <li class="seat">
                                                        <input type="checkbox" id={index} />
                                                        <label for={index}>{index}</label>
                                                    </li>
                                                </div>
                                            )
                                    )
                                    ||
                                    
                                        ( (!fl) && (<div class="col-lg-3">
                                                        <li class="seat">
                                                            <input type="checkbox" disabled id={index} />
                                                            <label for={index}>{index}</label>
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
                     
                        
                            }}
                    >
                      Confirm Seats
                    </button>
                  </div>        
        
   </div>
  );
}




