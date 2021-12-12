import React, { Component, useState } from 'react';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import Navbar from 'Navbar';
import UserHome from 'UserHome';
var username;

export default function(props) {
    const navigate = useNavigate();
    const user = useParams().username;
    username = user;
    return <ViewReservations navigate={navigate}  />;
  }

  function getUserName (){
    // const data = { username, password}
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
  
  
   axios({
    method: "get",
    url: "/session",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
      .then((response) => { 
        console.log(response.data);
        username = response.data;
        
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

class ViewReservations extends Component {

    constructor(props) {
        
        super(props);
        this.state = { flightsCollection: [] };
        const navigate = this.props.navigate;

    }
   
  
    componentDidMount() {
        console.log(username + ": username in viewReservation");
        axios.get('/reservation/' + username)
            .then(res => {
                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    gotoCancelReservation(deletedFlightNumber) {
        var bodyFormData = new FormData();
        bodyFormData.append('flightNumber', deletedFlightNumber);
        axios({
            method: "delete",
            url: "/reservation/" + username,
            headers: { "Content-Type": "multipart/form-data" },
            data: bodyFormData,
          })
              .then((response) => { 
                console.log(response.data)
                if(response.data==false){}
                else
                {this.componentDidMount() }
            })
        }
    // deleteFlight(deletedFlightNumber) {
    
          

        

   
 
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
      
      <td>{fl.FlightNumber}</td>
      <td>{fl.DepatureDate}</td>
      <td>{fl.ArrivalDate}</td>
      <td>{fl.DepatureAirport}</td>
      <td>{fl.ArrivalAirport}</td>
      <td>{fl.Class}</td>
      <td>{fl.Seats.length}</td>
      <td>{fl.Seats.join(",")}</td>
      <td>{fl.Price}</td>
      <td><button 
                      className="bg-blueGray-800 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={(e) =>{ e.preventDefault();
                        this.gotoCancelReservation(fl.FlightNumber);
                        
                            }
                        }
                      
                    >
                      Cancel Reservation 
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