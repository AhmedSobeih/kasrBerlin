import React, {useState} from "react";
import './css/styles.css';
import './assets/styles/index.css';
import Navbar from 'NavbarUser';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function UserHome() {
    const navigate = useNavigate();
    var username;
    function viewReservedFlights(){
      console.log(username + " :new username");
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
        console.log("text: "+ text);
        username = text;
        console.log("username: "+ username);
      }
    function getUserName (){
        // const data = { username, password}
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
      
      
       axios({
        method: "get",
        url: "/session",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then((response) => { 
            console.log(response.data);
            handleUserName(response.data);
            
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



