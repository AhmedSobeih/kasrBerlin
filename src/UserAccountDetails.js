import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate, useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';

var flag = true;
var firstFlag = true;

export default function UserAccountDetails() {
    console.log(useParams());
    const user = useParams().username; 
    const navigate = useNavigate();
    const location = useLocation();
    try{
      var refreshToken = location.state.refreshToken;
    var accessToken = location.state.accessToken;
    var type = location.state.type;
    }
    catch(err)
    {
      navigate('/login');
    }
    

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    //problem will occur in the conversion between mongoose and html in date conversion
    // mongoose: ""
    //html: "2021-11-10T16:32"
    const [passportNumber, setPassportNumber] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState(user);
    const CancelToken = axios.CancelToken;
    let cancel;


    console.log(user);
    axios({
      method: "get",
      url: "/user",
      headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
    })
    .then(res => {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
      console.log(res.data);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setPassportNumber(res.data.passportNumber);
      cancel();
  
    })
    .catch(function (error) {
        console.log(error);
    })
   
  function handleFirstName(number){
    setFirstName(number.target.value);
 //   console.log(economySeats);
  }
  function handleLastName(number){
    setLastName(number.target.value);
 //   console.log(economySeats);
  }
  function handleEmail(number){
    setEmail(number.target.value);
 //   console.log(economySeats);
  }
  function handlePassportNumber(number){
    setPassportNumber(number.target.value);
 //   console.log(economySeats);
  }

    function viewReservedFlights(){
       //  navigate('/createFlight');
    }

    function goUserAccount(){
       // navigate('/viewFlights');
    }
    function updateUser (){
        navigate('/UserUpdateDetails', {state: {accessToken: accessToken, refreshToken: refreshToken, type:type }});  
    }
    function changePassword (){
      navigate('/UserChangePassword', {state: {accessToken: accessToken, refreshToken: refreshToken, type:type }});  
  }
  function componentDidMount() {
    if(flag)
  {
    console.log(user);
    flag= false;
    axios({
      method: "get",
      url: "/user",
      headers: { "Content-Type": "multipart/form-data", "Authorization":"Bearer "+ accessToken },
    })
    .then(res => {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
      console.log(res.data);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setPassportNumber(res.data.passportNumber);
      cancel();
  
    })
    .catch(function (error) {
        console.log(error);
    })}
        
      
}

return (
<>
{Navbar()};
{componentDidMount()};
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
                <div className="btn-wrapper text-center">
                 </div>
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                 
                <div className="text-blueGray-5000 text-center mb-3 font-bold">
                   <h1>Update account Details</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <div/>{firstName}</div>
            
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <div/>{lastName}</div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <div/>{email}</div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Passport Number
                    </label>
                    <div/>{passportNumber}</div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {updateUser} onClickCapture = {updateUser}
                    >
                      Change Account Details
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {changePassword} onClickCapture = {changePassword}
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-right">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);}