import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

//const PUBLIC_KEY = "pk_test_51KD72pKQG3BZSLH4DXKU0bkh6gymwLK6kw3ciOYl1m0pqzrXlT5fZe9cG6wBPBEpKGUpnCZu5HFYB80A5JudoXCy00tvq5YESz";

const stripeTestPromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);
console.log(process.env.REACT_APP_PUBLIC_KEY);
const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;