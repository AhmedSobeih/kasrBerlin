import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import CreateFlight from "./createFlight";
import FlightByNumber from "./FlightbyNumber";
import UpdateFlight from "./UpdateFlight";
import ViewFlights from "./ViewFlights";
import ViewReservations from "./ViewReservations";
import SearchWithCriteria from "./SearchWithCriteria";
import SearchResults from "./SearchResults";
import AdminHome from './AdminHome';
import UserHome from './UserHome';
import UserAccountDetails from './UserAccountDetails';
import UserUpdateDetails from './UserUpdateDetails';
import UserChangePassword from './UserChangePassword';
import Index from './index';
import SearchFlightUser from './searchFlightUser';
import SearchResultsUser from './SearchResultsUser';
import DepartureFlight from './DepartureFlightDetails';
import SearchReturnFlight from './SearchReturnFlight';
import ReturnFlightDetails from './ReturnFlightDetails';
import Summary from './summary';
import Itinerary from './Itinerary';
import FlightSeats from './FlightSeats';
import ReturnFlightSeats from 'ReturnFlightSeats';
import ChangeSeats from 'changeSeats';
import ChangeSearchFlight from 'ChangeSearchFlight';
import ChangeSearchResFlight from 'ChangeSearchResFlight';
import ChangeFlightDetails from 'ChangeFlightDetails';
import ChangeNewFlightSeats from 'ChangeNewFlightSeats';
import StripContainer from './StripContainer';










function App(){
            console.log(process.env.REACT_APP_PUBLIC_KEY)

    return(

        <Router>
            <Routes>
                <Route path="/login" exact element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/createFlight" element={<CreateFlight/>} />
                <Route path="/flightByNumber" element={<FlightByNumber/>} />
                <Route path="/updateFlight/:flight" element={<UpdateFlight/>} />
                <Route path="/viewFlights" element={<ViewFlights/>} />
                <Route path="/ViewReservations" element={<ViewReservations/>} />
                <Route path="/searchWithCriteria" element={<SearchWithCriteria/>} />
                <Route path="/searchResults" element={<SearchResults/>} />
               <Route path="/AdminHome" element={<AdminHome/>} />
               <Route path="/UserHome" element={<UserHome/>} />
               <Route path="/UserAccountDetails" element={<UserAccountDetails/>} />
               <Route path="/UserUpdateDetails" element={<UserUpdateDetails/>} />
               <Route path="/UserChangePassword" element={<UserChangePassword/>} />
               <Route path="/" element={<Index/>} />
               <Route path="/searchFlightUser" element={<SearchFlightUser/>} />
               <Route path="/searchResultsUser" element={<SearchResultsUser/>} />
               <Route path="/departureFlight/:flight" element={<DepartureFlight/>} />
               <Route path="/searchReturnFlight" element={<SearchReturnFlight/>} />
               <Route path="/returnFlight/:flight" element={<ReturnFlightDetails/>} />
               <Route path="/summary" element={<Summary/>} />
               <Route path="/Itinerary" element={<Itinerary/>} />
               <Route path="/FlightSeats" element={<FlightSeats/>} />
               <Route path="/ReturnFlightSeats" element={<ReturnFlightSeats/>} />
               <Route path="/changeSeats" element={<ChangeSeats/>} />
               <Route path="/changeSearchFlight" element={<ChangeSearchFlight/>} />
               <Route path="/changeSearchResFlight" element={<ChangeSearchResFlight/>} />
               <Route path="/changeFlightDetails" element={<ChangeFlightDetails/>} />
               <Route path="/changeNewFlightSeats" element={<ChangeNewFlightSeats/>} />
               <Route path="/StripContainer" element={<StripContainer/>} />







            </Routes>
        </Router>
    );
}

export default App;

var accessToken = "asda";
//module.exports.accessToken = accessToken;
var setAccessToken = function setAccessToken(text)
{
    console.log("I am in setting access token");
    accessToken = text;
}
//module.exports.setAccessToken = setAccessToken;

var refreshToken;
function setRefreshToken(text)
{
    refreshToken = text;
}



