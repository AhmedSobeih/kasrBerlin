import React, {useState} from "react";
import ReactDOM from 'react-dom';
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'NavbarUser';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export default function UserHome() {
    const navigate = useNavigate();
    const location = useLocation();

    var refreshToken = location.state.refreshToken;
    var accessToken = location.state.accessToken;
    var type = location.state.type;

    var username;
    function viewReservedFlights(){
       navigate('/ViewReservations', {state: {accessToken: accessToken, refreshToken: refreshToken, type:type }});  
    }

    function goUserAccount(){
        navigate('/UserAccountDetails', {state: {accessToken: accessToken, refreshToken: refreshToken, type:type }});      
    }

    function goReserveFlight(){
      navigate('/searchFlightUser', {state: {accessToken: accessToken, refreshToken: refreshToken, type:type }});       
  }
    function goSearchFlights(){
      navigate('/searchWithCriteria', {state: {accessToken: accessToken, refreshToken: refreshToken, type:type }});
    }
    function handleUserName(text){
        username = text;
      }
    function getUserName (){
        // const data = { username, password}
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
      
       axios({
        method: "get",
        url: "/session",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            if(response.data.name == "TokenExpiredError")
              {
                navigate('/login');
              }
            else
            { 
            }
                     
        })
        return username;
      }
     
return (
<div>
    
    
    {Navbar()};
    <script>{getUserName()}</script>

  



    <div>
        <button className="bg-dark adminButtons" onClick={viewReservedFlights}>Reserved Flights</button>
    </div>
    <div>
        <button className="bg-dark adminButtons"  onClick={goUserAccount}>User Account</button>
    </div>
    <div>
        <button className="bg-dark adminButtons"  onClick={goReserveFlight}>Reserve a trip</button>
    </div>


   

</div>
);
}



