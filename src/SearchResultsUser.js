import React, { Component } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from 'NavbarUser';
import NavbarGuest from 'NavbarGuest';
import {useLocation} from 'react-router-dom';



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
    const location = useLocation(); // this uses Router based states to let us access cour state

    return <SearchResults navigate={navigate} location={location}  />;
  }

class SearchResults extends Component {

    constructor(props) {
        super(props);
        const location = this.props.location; 
        this.state = { flightsCollection: [], userCriteria: location.state.s, isUser: false };
        const navigate = this.props.navigate;



    }
    

   

    componentDidMount() {
       
        const location = this.props.location; // this uses Router based states to let us access cour state
        console.log(location.state.s.CabinClass);
        axios.get('/searchResults')
            .then(res => {
                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
            
            console.log("NNNNNNNNNNN")
            console.log(this.state.userCriteria);
           axios.get('/session')
            .then(res => {
              if(res.data==false)
                this.setState({isUser:false});
              else
              this.setState({isUser:true});
            })
    .catch(function (error) {
        console.log(error);
    })
    }
    
    gotoFlight(flightNumber) {
        this.props.navigate('/departureFlight/'+flightNumber)
    }

    getPrice(fl){
        if(this.state.userCriteria.CabinClass=="Economy Class")
          return parseInt(fl.EconomySeatPrice)*(parseInt(this.state.userCriteria.NumberOfAdults)+parseInt(this.state.userCriteria.NumberOfChildren));
        if(this.state.userCriteria.CabinClass=="Business Class")
          return parseInt(fl.BusinessSeatPrice)*(parseInt(this.state.userCriteria.NumberOfAdults)+parseInt(this.state.userCriteria.NumberOfChildren));
        if(this.state.userCriteria.CabinClass=="First Class")
          return parseInt(fl.FirstSeatPrice)*(parseInt(this.state.userCriteria.NumberOfAdults)+parseInt(this.state.userCriteria.NumberOfChildren));
  
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
{this.state.isUser&&Navbar()};
{
  !this.state.isUser&&
   NavbarGuest()
}
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Flight Number</th>
      <th scope="col">Departure Airport</th>
      <th scope="col">Arrival Airport</th>
      <th scope="col">Departure Date</th>
      <th scope="col">Arrival Date</th>
      <th scope="col">Trip Duration</th>
      <th scope="col">Total Price</th>
      <th scope="col">Baggage Allowance per Passenger</th>

    </tr>
  </thead>
  <tbody>
      {this.state.flightsCollection.map((fl,index) => 
                            (
                                  <tr>
      <th scope="row">{index+1}</th>
      
      <td>{fl.FlightNumber}</td>
      <td>{fl.DepatureAirport}</td>
      <td>{fl.ArrivalAirport}</td>
      <td>{this.dateConversion(fl.DepatureDate)}</td>
      <td>{this.dateConversion(fl.ArrivalDate)}</td>
      <td>{this.durationCalculation(fl.DepatureDate,fl.ArrivalDate).hour} hours, {this.durationCalculation(fl.DepatureDate,fl.ArrivalDate).min} minutes</td>
      <td>{this.getPrice(fl)}</td>
      <td>{fl.BaggageAllowance}</td>

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