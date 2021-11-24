import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/styles.css';
import App from './App.js';


const Anchor =({title})=>{
        return (
            <li className="nav-item">
        <a className="nav-link" href="#!">{title}
        </a>
        </li>
        )
       };

const Subscriptions=({plan,price,perValue,first,second,third,fourth})=>{
                  return (<div className="col-lg-6 col-xl-4">
                        <div className="card mb-5 mb-xl-0">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold text-muted">{plan}</div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">{price}</span>
                                    <span className="text-muted">{perValue}</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>{first}</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        {second}
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        {third}
                                           </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        {fourth}
                                    </li>
                                   
                                </ul>
                                <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>);

}


const Division2 =({title,paragraph,action})=>{
    return(
        <div className="col-lg-4 mb-5 mb-lg-0">        
        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
            <i className="bi bi-collection"></i>
        </div>
        <h2 className="h4 fw-bolder">{title}</h2>
                        <p>{paragraph}</p>
                        <a className="text-decoration-none" href="#!">
                            {action}
                            <i className="bi bi-arrow-right"></i>
                        </a>
</div>
    )
};










   
function Home(){
  return (
      <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <a className="navbar-brand" href="/register">Register now</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                         <Anchor title="about"/>
                         <Anchor title="Contact"/>
                         <Anchor title="Services"/>
                    </ul>
                </div>
            </div>
          </nav>
       
       <header class="bg-dark py-5">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-5 fw-bolder text-white mb-2">Airo Airline Homepage</h1>
                            <p class="lead text-white-50 mb-4">The gratest adventure lies ahead</p>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                <a class="btn btn-primary btn-lg px-4 me-sm-3" href="/Login">Login</a>
                                <a class="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/* <!-- Features section--> */}
        <section className="py-5 border-bottom" id="features">
             <div className="container px-5 my-5">
                <div className="row gx-5">
                    <Division2 title="Featured title" paragraph="aragraph of text beneath the heading to explain the heading. We'll add onto it with another" action="Call to action"/>
                      
                    <Division2 title="Featured title" paragraph="aragraph of text beneath the heading to explain the heading. We'll add onto it with another" action="Call to action"/>

                     <Division2 title="Featured title" paragraph="aragraph of text beneath the heading to explain the heading. We'll add onto it with another" action="Call to action"/>
                   
                   
                </div>
            </div>
        </section>
       
       
        <section className="bg-light py-5 border-bottom">
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Choose your own class</h2>
                    <p className="lead mb-0">With our no hassle pricing plans</p>
                </div>
                <div className="row gx-5 justify-content-center">
                   
                    <Subscriptions plan ="free" perValue=" " price="$0" first="Economy class" second="Seats usually recline" third="have a fold-down table" fourth="Seat pitch ranges from 28 to 36 inche"/>
                    <Subscriptions plan ="free" perValue=" " price="$0" first="Business class" second="A seat with direct aisle access and no seatmate" third="An excellent pillow and blanket" fourth="Wifi, ideally reasonably priced"/>
                    <Subscriptions plan ="free" perValue=" " price="$0" first="First class" second="seat will typically be extremely comfortable and spacious" third="seat will likely fully recline into a bed" fourth="have its own enclosed pod around it for added privacy"/>

                </div>
            </div>
        </section>
        
        <section className="py-5 border-bottom">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Customer testimonials</h2>
                    <p className="lead mb-0">Our loyal customers who love travelling with us</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        {/* <!-- Testimonial 1--> */}
                        <div className="card mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div className="ms-4">
                                        <p className="mb-1">A big Thanks to @AiroAirlines for excellent customer service on my last trip (20 hours of travel). It is much appreciated!</p>
                                        <div className="small text-muted">- Ahmed, Berlin</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Testimonial 2--> */}
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div className="ms-4">
                                        <p className="mb-1">@AiroAirlines is the best airline for customer service by far. No hassle flight changes, best points rewards program, and best employees. There's a reason I only fly AA. Shoutout to the amazing crew at CAI airport too- always a pleasure there. </p>
                                        <div className="small text-muted">- Linda, Egypt</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <section className="bg-light py-5">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                    <h2 className="fw-bolder">Subscribe to our mailbox</h2>
                    <p className="lead mb-0">We'd love for you to get the latest updates</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                          

                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                            {/* <!-- Name input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label for="name">Full name</label>
                                <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            {/* <!-- Email address input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label for="email">Email address</label>
                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            {/* <!-- Phone number input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label for="phone">Phone number</label>
                                <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                            {/* <!-- Message input--> */}
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: '10rem'}} data-sb-validations="required"></textarea>
                                <label for="message">Message</label>
                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                            {/* <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted--> */}
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            {/* <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form--> */}
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            {/* <!-- Submit Button--> */}
                            <div className="d-grid"><button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Footer--> */}
        <footer className="py-5 bg-dark">
            <div className="container px-5"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2021</p></div>
        </footer>
       
        {/* <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- * *                               SB Forms JS                               * *-->
        <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script> */}

        
    </div>
  );
}
//  const Person =()=>{
//     return <div>
//       this is a message
//     </div>
//   }







ReactDOM.render(<App/>,document.getElementById('root'));



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
