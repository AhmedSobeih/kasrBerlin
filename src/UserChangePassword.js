import React, {useState} from "react";

import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams,useNavigate, useLocation} from 'react-router-dom';
import Navbar from 'NavbarUser';

var flag = true;

export default function UserChangePassword() {
    const user = useParams().username; 
    const navigate = useNavigate();
    try{
      var accessToken = localStorage.getItem('acessToken');
      var refreshToken = localStorage.getItem('refreshToken');
      var type = localStorage.getItem('type');
      if(type == 0)
      {
        navigate('/');
      }
      }
      catch(err)
      {
        navigate('/');
      }
    const [loginSuccess, setLoginSuccess] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [username, setUserName] = useState(user);
    const CancelToken = axios.CancelToken;
    let cancel;

  function handleOldPassword(number){
    setOldPassword(number.target.value);
 //   console.log(economySeats);
  }
  function handleNewPassword(number){
    setNewPassword(number.target.value);
 //   console.log(economySeats);
  }
  function handleNewPasswordConfirmation(number){
    setNewPasswordConfirmation(number.target.value);
 //   console.log(economySeats);
  }


    function updatePassword (){

        var bodyFormData = new FormData();
        bodyFormData.append('oldPassword', oldPassword);
        bodyFormData.append('newPassword', newPassword);

        if(newPassword != newPasswordConfirmation)
        {
          setLoginSuccess("Password doesn't match");
          return;
        }
      
      axios({
        method: "put",
        url: "/password",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data","Authorization":"Bearer "+ accessToken },
      })
          .then((response) => { 
            console.log(response.data);
          
            if(response.data.status==false)
              console.log(response.data.response);
            else
            {
              setLoginSuccess("Password Updated");
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
                   <h1>Change Password</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Old Password
                    </label>
                    <input
                     type="password" onChangeCapture={handleOldPassword}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
            
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      New Password
                    </label>
                    <input
                     type="password" onChangeCapture={handleNewPassword}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm New Password
                    </label>
                    <input
                     type="password" onChangeCapture={handleNewPasswordConfirmation}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick = {updatePassword} onClickCapture = {updatePassword}
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
            <div class="" id='loginFail' display='none'  role="alert">{loginSuccess}</div>
              <div className="w-1/2 text-right">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);}