import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import CreateFlight from "./createFlight";
import FlightByNumber from "./FlightbyNumber";
import UpdateFlight from "./UpdateFlight";
import ViewFlights from "./ViewFlights";
import SearchWithCriteria from "./SearchWithCriteria";
import SearchResults from "./SearchResults";



function App(){
    return(
        
        <Router>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/createFlight" element={<CreateFlight/>} />
                <Route path="/flightByNumber" element={<FlightByNumber/>} />
                <Route path="/updateFlight/:flight" element={<UpdateFlight/>} />
                <Route path="/viewFlights" element={<ViewFlights/>} />
                <Route path="/searchWithCriteria" element={<SearchWithCriteria/>} />
                <Route path="/searchResults" element={<SearchResults/>} />




            </Routes>
        </Router>
    );
}

export default App;