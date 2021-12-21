import React, { Component } from 'react';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest';

var flag= false;

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
    const location = useLocation();

  
    return <SearchResults navigate={navigate} location={location}  />;
  }

class SearchResults extends Component {

    constructor(props) {
        super(props);
        const location = this.props.location; 
        this.state = { flightsCollection: [] , departureFlight: location.state.departureFlight, TripDuration: location.state.tripDuration, userCriteria: location.state.userCriteria, DepartureFlightVisibility:"true",  isUser: false, ErrorMessage:"" };
        const navigate = this.props.navigate;

    }

    
   

    componentDidMount() {
      const location = this.props.location; // this uses Router based states to let us access cour state
      console.log(location.state.departureFlight);
      // this.setState({userCriteria : location.state.userCriteria});
      // this.setState({departureFlight : location.state.departureFlight});
        axios.get('/searchRetResults')
            .then(res => {
              console.log(res.data);
            
              for(var i=0; i<res.data.length; i++)
              {
                res.data[i].DepatureDate = this.dateConversion( res.data[i].DepatureDate);
                res.data[i].ArrivalDate = this.dateConversion( res.data[i].ArrivalDate);

              
                if(isDateTrue(res.data[i].DepatureDate,this.state.departureFlight.ArrivalDate))
                  {
                    res.data.splice(i,1);
                    i--;
                    continue;
                  }
              }
              
                this.setState({ flightsCollection: res.data });
      
                if(res.data.length==0)
                 {
                  this.setState({ErrorMessage:"No return flights available for the chosen departure Flight"});
                  console.log("No return flights available for the chosen departure Flight");
                 }
              }
          
            )
            .catch(function (error) {
                console.log(error);
            })

   function isDateTrue(departureDate, arrivalDate){
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
    if(diff>=0)
        return true;
    else
        return false;
  }
    // axios.get('/departureFlight')
    // .then(res => {
    
    //   this.setState({departureFlight: res.data});
    //   console.log(this.state.departureFlight);
  
    // })


    // axios.get('/userCriteria')
    // .then(res => {
    
    //   this.setState({userCriteria: res.data});
  
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })
    axios.get('/session')
            .then(res => {
              if(res.data==false)
                this.setState({isUser:false});
              else
              this.setState({isUser:true});
            })
    }
    gotoReturnFlight(fl,price) {
      var ReturnFlight = {};
      ReturnFlight.FlightNumber = fl.FlightNumber;
      ReturnFlight.DepatureDate = fl.DepatureDate;
      ReturnFlight.ArrivalDate = fl.ArrivalDate;
      ReturnFlight.FreeEconomySeatsNum = fl.FreeEconomySeatsNum;
      ReturnFlight.FreeBusinessSeatsNum = fl.FreeBusinessSeatsNum;
      ReturnFlight.FreeFirstSeatsNum = fl.FreeFirstSeatsNum;
      ReturnFlight.DepatureAirport = fl.DepatureAirport;
      ReturnFlight.ArrivalAirport = fl.ArrivalAirport;
      ReturnFlight.TripDuration = fl.TripDuration;
      ReturnFlight.CabinClass = this.state.userCriteria.CabinClass;
      ReturnFlight.BaggageAllowance = fl.BaggageAllowance;
      ReturnFlight.FlightPrice = price;
      ReturnFlight.isReturnFlight = true;
      console.log(ReturnFlight);
        this.props.navigate('/returnFlight/'+fl.FlightNumber, {state: {departureFlight:this.state.departureFlight, returnFlight:ReturnFlight}})
    }    

    dateConversion(date){
      let newDate = "";
      for(var i=0;i<16;i++)
      {
          newDate = newDate + date[i];
      }
      // 2001-02-10T22:25
      //2000-10-10T15:02:00.000Z
      return newDate;
    }
    getPrice(fl){
      if(this.state.departureFlight.CabinClass=="Economy Class")
        return parseInt(fl.EconomySeatPrice)*(parseInt(this.state.userCriteria.NumberOfAdults)+parseInt(this.state.userCriteria.NumberOfChildren));
      if(this.state.departureFlight.CabinClass=="Business Class")
        return parseInt(fl.BusinessSeatPrice)*(parseInt(this.state.userCriteria.NumberOfAdults)+parseInt(this.state.userCriteria.NumberOfChildren));
      if(this.state.departureFlight.CabinClass=="First Class")
        return parseInt(fl.FirstSeatPrice)*(parseInt(this.state.userCriteria.NumberOfAdults)+parseInt(this.state.userCriteria.NumberOfChildren));

    }    
     showDepartureFlight(e)  {
      const checked = e.target.checked;
      if (checked) {
       this.setState({DepartureFlightVisibility: false});
      } else {
        this.setState({DepartureFlightVisibility: true});
      }
    };

     durationCalculation(departureDate, arrivalDate){
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
    

   
 
    render() {
        const  navigate  = this.props.navigate;

        return (









            
            <div className="wrapper-users">
{this.state.isUser && Navbar()};
{!this.state.isUser && NavbarGuest()};

<div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
          <h1>Show Departure Flight Details</h1>
                    <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                this.showDepartureFlight(e);
                            }}
                            ></input>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0" hidden={this.state.DepartureFlightVisibility}>
              <div className="rounded-t mb-0 px-6 py-6">
                
                <div className="btn-wrapper text-center">
                 </div>
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                 
                <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Departure Flight Details</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Flight Number
                    </label>
                    <div>{this.state.departureFlight.FlightNumber}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Date & Time
                    </label>
                    <div>{this.state.departureFlight.DepatureDate}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date & Time
                    </label>
                    <div>{this.state.departureFlight.ArrivalDate}</div>

                  </div>
                 <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport
                    </label>
                    <div>{this.state.departureFlight.DepatureAirport}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport
                    </label>
                    <div>{this.state.departureFlight.ArrivalAirport}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Trip Duration
                    </label>
                    <div>{this.state.TripDuration}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Cabin Class
                    </label>
                    <div>{this.state.departureFlight.CabinClass}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Baggage Allowance
                    </label>
                    <div>{this.state.departureFlight.BaggageAllowance}</div>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Flight Total Price
                    </label>
                    <div>{this.state.departureFlight.FlightPrice}</div>

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
      <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Choose your return flight</h1>
                </div>
                
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Flight Number</th>
      <th scope="col">Departure Date</th>
      <th scope="col">Arrival Date</th>
      <th scope="col">Trip Duration</th>
      <th scope="col">Total Price</th>
      <th scope="col">Baggage Allowance per passenger</th>

    </tr>
  </thead>
  <tbody>
      {this.state.flightsCollection.map((fl,index) => 
                            (
                                  <tr>
      <th scope="row">{index+1}</th>
      
      <td className>{fl.FlightNumber}</td>
      <td>{this.dateConversion(fl.DepatureDate)}</td>
      <td>{this.dateConversion(fl.ArrivalDate)}</td>
      <td>{this.durationCalculation(fl.DepatureDate,fl.ArrivalDate).hour} hours, {this.durationCalculation(fl.DepatureDate,fl.ArrivalDate).min} minutes </td>
      <td id="price">{(this.getPrice(fl))}</td>
      <td>{fl.BaggageAllowance}</td>

      <td><button 
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={(e) =>{ e.preventDefault();
                        this.gotoReturnFlight(fl,document.getElementById ( "price" ).innerText)
                        
                            }
                        }
                      
                    >
                      View Details 
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
                  <div id='searchFail' className="alert-warning text-center">{this.state.ErrorMessage}</div>

            </div> 
            
        )
    }
}