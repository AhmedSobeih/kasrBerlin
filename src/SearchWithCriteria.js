import React , {useState} from "react";
import ReactDOM from 'react-dom';

export default function SearchWithCriteia(){
    const [flightNumberVisibility, setFlightNumberVisibility] = useState(true);
    const [DepartureDateVisibility, setDepartureDateVisibility] = useState(true);
    const [ArrivalDateVisibility, setArrivalDateVisibility] = useState(true);
    const [EconomySeatsVisibility, setEconomySeatsVisibility] = useState(true);
    const [BusinessSeatsVisibility, setBusinessSeatsVisibility] = useState(true);
    const [DepartureAirportVisibility, setDepartureAirportVisibility] = useState(true);
    const [ArrivalAirportVisibility, setArrivalAirportVisibility] = useState(true);

    const showFlightNumber = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setFlightNumberVisibility(false);
    } else {
     setFlightNumberVisibility(true);
    }
  };
  const showDepartureDate = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setDepartureDateVisibility(false);
    } else {
     setDepartureDateVisibility(true);
    }
  };
  const showArrivalDate = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setArrivalDateVisibility(false);
    } else {
     setArrivalDateVisibility(true);
    }
  };
  const showEconomySeats = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setEconomySeatsVisibility(false);
    } else {
     setEconomySeatsVisibility(true);
    }
  };
  const showBusinessSeats = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setBusinessSeatsVisibility(false);
    } else {
     setBusinessSeatsVisibility(true);
    }
  };
  const showDepartureAirport = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setDepartureAirportVisibility(false);
    } else {
     setDepartureAirportVisibility(true);
    }
  };
  const showArrivalAirport = (e) => {
    const checked = e.target.checked;
    if (checked) {
     setArrivalAirportVisibility(false);
    } else {
     setArrivalAirportVisibility(true);
    }
  };
 

return(


<>
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
                   <h1>search with Criteria</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                   
                <div className="relative w-full mb-3" >
                     <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showFlightNumber(e);
                            }}/>
                    <label
                    style={{margin:'5px'}}
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Flight Number
                    </label>
                    <input
                     hidden={flightNumberVisibility}

                     type="number" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                       <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showDepartureDate(e);
                            }}/>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Date 
                    </label>
                    <input
                     hidden={DepartureDateVisibility}

                     type="datetime-local" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                       <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showArrivalDate(e);
                            }}/>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Date
                    </label>
                    <input
                      hidden={ArrivalDateVisibility}

                     type="datetime-local" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                       <input type="checkbox" name="number" value="number"  onClick={(e) => {
                                showEconomySeats(e);
                            }}/>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Economy Seats
                    </label>
                    <input
                         hidden={EconomySeatsVisibility}
                 type="number" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                       <input type="checkbox"  onClick={(e) => {
                                showBusinessSeats(e);
                            }}/>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Number of Business Seats
                    </label>
                    <input
                            hidden={BusinessSeatsVisibility}
             
                     type="number" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div><div className="relative w-full mb-3">
                       <input type="checkbox"  onClick={(e) => {
                                showDepartureAirport(e);
                            }}/>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Depature Airport
                    </label>
                    <input
                              hidden={DepartureAirportVisibility}
            type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                       <input type="checkbox"   onClick={(e) => {
                                showArrivalAirport(e);
                            }}/>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Arrival Airport
                    </label>
                    <input
                    hidden={ArrivalAirportVisibility}
                    type="text" 
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  
                    >
                        Search The Flight
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);
}