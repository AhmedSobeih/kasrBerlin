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








function App(){
    return(
        
        <Router>
            <Routes>
                <Route path="/login" exact element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/createFlight" element={<CreateFlight/>} />
                <Route path="/flightByNumber" element={<FlightByNumber/>} />
                <Route path="/updateFlight/:flight" element={<UpdateFlight/>} />
                <Route path="/viewFlights" element={<ViewFlights/>} />
                <Route path="/ViewReservations/:username" element={<ViewReservations/>} />
                <Route path="/searchWithCriteria" element={<SearchWithCriteria/>} />
                <Route path="/searchResults" element={<SearchResults/>} />
               <Route path="/AdminHome" element={<AdminHome/>} />
               <Route path="/UserHome" element={<UserHome/>} />
               <Route path="/UserAccountDetails/:username" element={<UserAccountDetails/>} />
               <Route path="/UserUpdateDetails/:username" element={<UserUpdateDetails/>} />
               <Route path="/UserChangePassword/:username" element={<UserChangePassword/>} />
               <Route path="/" element={<Index/>} />
               <Route path="/searchFlightUser" element={<SearchFlightUser/>} />
               <Route path="/searchResultsUser" element={<SearchResultsUser/>} />
               <Route path="/departureFlight/:flight" element={<DepartureFlight/>} />
               <Route path="/searchReturnFlight" element={<SearchReturnFlight/>} />
               <Route path="/returnFlight/:flight" element={<ReturnFlightDetails/>} />
               <Route path="/summary" element={<Summary/>} />
               <Route path="/Itinerary" element={<Itinerary/>} />
               <Route path="/FlightSeats" element={<FlightSeats/>} />

             







            </Routes>
        </Router>
    );
}

export default App;