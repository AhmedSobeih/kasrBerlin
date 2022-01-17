import React, { Component } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from 'Navbar';
var authorized = true;

const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };
export default function(props) {
    const navigate = useNavigate();
        var accessToken = localStorage.getItem('acessToken');
        var refreshToken = localStorage.getItem('refreshToken');
        var type = localStorage.getItem('type');
        
        if(type == 1)
        {
            authorized = false;
          navigate('/');
        }
  
    return <SearchResults navigate={navigate}  />;
  }

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { flightsCollection: [], isUser: {} };
        const navigate = this.props.navigate;

    }
   

    componentDidMount() {
        
        axios({
            method: "get",
            url: '/searchResults',
            headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ this.props.accessToken },
          })
            .then(res => {
                console.log('HHHHHHHHHHHHHHHHHHH' + res.data);
                if(res.data.name == "TokenExpiredError"|| res.data.name == "JsonWebTokenError" || !authorized)
              {
                this.props.navigate('/login');
              }
                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
            
          
    }
    gotoUpdateFlight(deletedFlightNumber) {
        this.props.navigate('/updateFlight/'+deletedFlightNumber)
    }
    deleteFlight(deletedFlightNumber) {
        axios({
            method: "delete",
            url: "/flight/" + deletedFlightNumber,
            headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ this.props.accessToken },
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
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Flight Number</th>
      <th scope="col">Departure Date</th>
      <th scope="col">Arrival Date</th>
      <th scope="col">Econpmy Seats</th>
      <th scope="col">Business seats</th>
      <th scope="col">Departure Airport</th>
      <th scope="col">Arrival Airport</th>
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
      <td>{fl.EconomySeats}</td>
      <td>{fl.BusinessSeats}</td>
      <td>{fl.DepatureAirport}</td>
      <td>{fl.ArrivalAirport}</td>
      <td><button 
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={(e) =>{ e.preventDefault();
                        this.gotoUpdateFlight(fl.FlightNumber);
                        
                            }
                        }
                      
                    >
                      Update Flight 
     </button> </td>
      <td>
      <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to delete the flight?")) {
                         this.deleteFlight(fl.FlightNumber);

                      } else {
                        
                        }
                        
                            }
                    } 
                    >
                      Delete Flight 
     </button>
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