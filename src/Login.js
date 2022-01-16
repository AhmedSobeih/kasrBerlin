import React, {useState} from "react";

import ReactDOM from 'react-dom';
import './css/styles.css';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';
import {useNavigate} from 'react-router-dom';


import axios from 'axios';


export default function Login() {
  
  const [loginSuccess, setLoginSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  function componentDidMount() {
    axios.get('/allFlights')
        .then(res => {
            this.setState({ flightsCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
}
 
function tryRegister(){

          navigate('/register');

}
function tryLogin (){
  // const data = { username, password}
  var bodyFormData = new FormData();
  bodyFormData.append('username', username);
  bodyFormData.append('password', password);


 axios({
  method: "post",
  url: "/login2",
  data: bodyFormData,
  headers: { "Content-Type": "multipart/form-data" },
})
    .then((response) => { //marwan
      localStorage.setItem('acessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('type', response.data.type) 
      
      if(response.data.state == false)
       {
        setLoginSuccess('Invalid username or password!');
        document.getElementById('loginFail').setAttribute("class","alert alert-danger text-center") ;
       } 
      else
      {
        if(response.data.type == 0)
          navigate('/AdminHome');
        else
          navigate('/UserHome');
      }
        
  })
}


function handleEmail(text){
  setUsername(text.target.value);
}

function handlePassword(text){
  setPassword(text.target.value);
}
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign Up With
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                 <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" onClick={tryRegister}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email" onChange={handleEmail}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password" onChange={handlePassword}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" onClick={tryLogin}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div> 
            <div class="" id='loginFail' display='none'  role="alert">{loginSuccess}</div>

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

              </div>
              
            </div>
          </div>
          
        </div>

      </div>

    </>
  );
}
//ReactDOM.render(<Login/>,document.getElementById('root'));
