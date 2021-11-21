import React, { Component } from 'react';
import axios from 'axios';


export default class ViewFlights extends Component {

    constructor(props) {
        super(props);
        this.state = { flightsCollection: [] };
    }

    componentDidMount() {
        axios.get('/allFlights')
            .then(res => {
                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

   
 
    render() {
        return (









            
            <div className="wrapper-users">

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
      <td>{fl.DepartureDate}</td>
      <td>{fl.ArrivalDate}</td>
      <td>{fl.EconomySeats}</td>
      <td>{fl.BusinessSeats}</td>
      <td>{fl.DepatureAirport}</td>
      <td>{fl.ArrivalAirport}</td>
      <td><button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  
                      
                    >
                      Update Flight 
     </button> </td>
      <td>
      <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  
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