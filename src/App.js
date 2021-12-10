import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import CreateFlight from "./createFlight";
import FlightByNumber from "./FlightbyNumber";
import UpdateFlight from "./UpdateFlight";
import ViewFlights from "./ViewFlights";
import SearchWithCriteria from "./SearchWithCriteria";
import SearchResults from "./SearchResults";
import AdminHome from './AdminHome';
import UserHome from './UserHome';
import UserAccountDetails from './UserAccountDetails';
import UserUpdateDetails from './UserUpdateDetails';
import Index from './index';
import SearchFlightGuest from './searchFlightGuest';
import SearchResultsGuest from './SearchResultsGuest';
import DepartureFlight from './DepartureFlightDetails';
import SearchReturnFlight from './SearchReturnFlight';
import ReturnFlightDetails from './summary';








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
                <Route path="/searchWithCriteria" element={<SearchWithCriteria/>} />
                <Route path="/searchResults" element={<SearchResults/>} />
               <Route path="/AdminHome" element={<AdminHome/>} />
               <Route path="/UserHome" element={<UserHome/>} />
               <Route path="/UserAccountDetails/:username" element={<UserAccountDetails/>} />
               <Route path="/UserUpdateDetails/:username" element={<UserUpdateDetails/>} />
               <Route path="/" element={<Index/>} />
               <Route path="/searchFlightGuest" element={<SearchFlightGuest/>} />
               <Route path="/searchResultsGuest" element={<SearchResultsGuest/>} />
               <Route path="/departureFlight/:flight" element={<DepartureFlight/>} />
               <Route path="/searchReturnFlight" element={<SearchReturnFlight/>} />
               <Route path="/summary/:flight" element={<ReturnFlightDetails/>} />
             







            </Routes>
        </Router>
    );
}

export default App;