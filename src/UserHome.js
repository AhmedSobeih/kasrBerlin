import React, {useState} from "react";
import ReactDOM from 'react-dom';
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'NavbarUser';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export default function UserHome() {
    localStorage.setItem('type', 1) 
    const navigate = useNavigate();
    try{
    var accessToken = localStorage.getItem('acessToken');
    var refreshToken = localStorage.getItem('refreshToken');
    var type = localStorage.getItem('type');
    
    if(type != 1)
    {
      navigate('/');
    }
    }
    catch(err)
    {
      navigate('/');
    }

    var username;
    function viewReservedFlights(){
       navigate('/ViewReservations');  
    }

    function goUserAccount(){
        navigate('/UserAccountDetails');      
    }

    function goReserveFlight(){
      navigate('/searchFlightUser');       
  }
    function goSearchFlights(){
      navigate('/searchWithCriteria');
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
        headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken ,"grant_type" :refreshToken },
      })
          .then((response) => { 
            console.log(response);
            if(response.data.name == "TokenExpiredError"|| response.data.name == "JsonWebTokenError")
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



