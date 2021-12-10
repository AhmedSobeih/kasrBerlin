import React, { Component } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from 'Navbar';

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
  
    return <SearchResults navigate={navigate}  />;
  }

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { flightsCollection: [] };
        const navigate = this.props.navigate;

    }
   

    componentDidMount() {
        axios.get('/searchResults')
            .then(res => {
                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    gotoFlight(flightNumber) {
        this.props.navigate('/departureFlight/'+flightNumber)
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
      <td>{fl.DepatureAirport}</td>
      <td>{fl.ArrivalAirport}</td>
      <td><button 
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={(e) =>{ e.preventDefault();
                        this.gotoFlight(fl.FlightNumber);
                        
                            }
                        }
                      
                    >
                     View Details
     </button> </td>
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