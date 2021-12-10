import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import Navbar from 'Navbar';

var flag = true;

export default function UserAccountDetails() {

    let {user} = useParams(); 
    const navigate = useNavigate();

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

  if(flag)
  {
    flag= false;
    console.log(1);
    axios.get('/user/'+username)
    .then(res => {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
      
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setPassportNumber(res.data.passportNumber);
      cancel();
  
    })
    .catch(function (error) {
        console.log(error);
    })
  }   
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

        var bodyFormData = new FormData();
        bodyFormData.append('firstName', firstName);
        bodyFormData.append('lastName', lastName);
        bodyFormData.append('email', email);
        bodyFormData.append('passportNumber', passportNumber);
      
      axios({
        method: "put",
        url: "/user/" + username,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then((response) => { 
          
            if(response.data==false)
              console.log("User cannot be updated")
            else
            {
              console.log('User updated successfully');
              navigate('/UserHome');
            }
        })
    }

return (

<>
{Navbar()};
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
                    <input
                     type="text" onChangeCapture={handleFirstName}  defaultValue={firstName}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
            
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                     type="text" onChangeCapture={handleLastName} defaultValue={lastName}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                     type="email" onChangeCapture={handleEmail} defaultValue={email}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Passport Number
                    </label>
                    <input
                     type="text" onChangeCapture={handlePassportNumber} defaultValue={passportNumber}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {updateUser} onClickCapture = {updateUser}
                    >
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);}