import React from 'react';
import ReactDOM from 'react-dom';
export default function Navbar(){
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <a className="navbar-brand" href="/UserHome">Airo Airplane system</a>

            <div className="collapse navbar-collapse" id="navلآbbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><a className="nav-link" href="/ViewReservations/">My Reserved Flights</a></li>
                    <li className="nav-item"><a className="nav-link" href="/UserAccountDetails/">My Account</a></li>
                    <li className="nav-item"><a className="nav-link" href="/searchFlightUser">Reserve a Trip</a></li>
                </ul>
            </div>
        </div>
    </nav>
    );
}
