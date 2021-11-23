import react from 'react'
import './css/styles.css';
import './assets/styles/index.css';
export default function AdminHome() {
return (
<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <a className="navbar-brand" href="#!">Airo Airplane system</a>

            <div className="collapse navbar-collapse" id="navلآbbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><a className="nav-link" href="#!">Create Flight</a></li>
                    <li className="nav-item"><a className="nav-link" href="#!">view Flights</a></li>
                    <li className="nav-item"><a className="nav-link" href="#!">Search flights with specific criteria</a></li>
                </ul>
            </div>
        </div>
    </nav>

  



    <div>
        <button className="bg-dark adminButtons">Create Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons">View Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons">Search Flights</button>
        </div>


   

</div>
);
}



