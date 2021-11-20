import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import Login from './Login';
import Register from './Register.js';
function Home(){
  return (
      <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <a className="navbar-brand" href="#!">Start Bootstrap</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navلآbbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Services</a></li>
                    </ul>
                </div>
            </div>
        </nav>
       
        <header className="bg-dark py-5">
            <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        <div classNameName="text-center my-5">
                            <h1 classNameName="display-5 fw-bolder text-white mb-2">Reserve Your Flight In Few Minutes</h1>
                            <p classNameName="lead text-white-50 mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit!</p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                                <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
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
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                        <h2 className="h4 fw-bolder">Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <a className="text-decoration-none" href="#!">
                            Call to action
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i></div>
                        <h2 className="h4 fw-bolder">Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <a className="text-decoration-none" href="#!">
                            Call to action
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    <div className="col-lg-4">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                        <h2 className="h4 fw-bolder">Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <a className="text-decoration-none" href="#!">
                            Call to action
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
       
        <section className="bg-light py-5 border-bottom">
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Pay as you grow</h2>
                    <p className="lead mb-0">With our no hassle pricing plans</p>
                </div>
                <div className="row gx-5 justify-content-center">
                   
                    <div className="col-lg-6 col-xl-4">
                        <div className="card mb-5 mb-xl-0">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold text-muted">Free</div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">$0</span>
                                    <span className="text-muted">/ mo.</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>1 users</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        5GB storage
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Unlimited public projects
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Community access
                                    </li>
                                    <li className="mb-2 text-muted">
                                        <i className="bi bi-x"></i>
                                        Unlimited private projects
                                    </li>
                                    <li className="mb-2 text-muted">
                                        <i className="bi bi-x"></i>
                                        Dedicated support
                                    </li>
                                    <li className="mb-2 text-muted">
                                        <i className="bi bi-x"></i>
                                        Free linked domain
                                    </li>
                                    <li className="text-muted">
                                        <i className="bi bi-x"></i>
                                        Monthly status reports
                                    </li>
                                </ul>
                                <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-6 col-xl-4">
                        <div className="card mb-5 mb-xl-0">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    Pro
                                </div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">$9</span>
                                    <span className="text-muted">/ mo.</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>5 users</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        5GB storage
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Unlimited public projects
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Community access
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Unlimited private projects
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Dedicated support
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Free linked domain
                                    </li>
                                    <li className="text-muted">
                                        <i className="bi bi-x"></i>
                                        Monthly status reports
                                    </li>
                                </ul>
                                <div className="d-grid"><a className="btn btn-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-6 col-xl-4">
                        <div className="card">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold text-muted">Enterprise</div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">$49</span>
                                    <span className="text-muted">/ mo.</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>Unlimited users</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        5GB storage
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Unlimited public projects
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Community access
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Unlimited private projects
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Dedicated support
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>Unlimited</strong>
                                        linked domains
                                    </li>
                                    <li className="text-muted">
                                        <i className="bi bi-check text-primary"></i>
                                        Monthly status reports
                                    </li>
                                </ul>
                                <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-5 border-bottom">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Customer testimonials</h2>
                    <p className="lead mb-0">Our customers love working with us</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        {/* <!-- Testimonial 1--> */}
                        <div className="card mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div className="ms-4">
                                        <p className="mb-1">Thank you for putting together such a great product. We loved working with you and the whole team, and we will be recommending you to others!</p>
                                        <div className="small text-muted">- Client Name, Location</div>
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
                                        <p className="mb-1">The whole team was a huge help with putting things together for our company and brand. We will be hiring them again in the near future for additional work!</p>
                                        <div className="small text-muted">- Client Name, Location</div>
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
                    <h2 className="fw-bolder">Get in touch</h2>
                    <p className="lead mb-0">We'd love to hear from you</p>
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
ReactDOM.render(<Login/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
