import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({ products, getAPageReload }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: false,
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    return products.reduce((accumulator, curProduct) => {
      return accumulator + curProduct.count * curProduct.price;
    }, 0);
  };

  const makePayment = (token) => {
    console.log(
      "in frontend makePayment running and token received from stripe is:",
      token
    );
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("makePayment fetch response:", response);
        if (response.status === 200) {
          emptyCart(() => {
            getAPageReload();
          });
        }
        //call further methods like createOrder, emptyCart...
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51J1YMASEpDYtfrHepgqh6os7mXF2a68xqS3rsjBKriEYE2gK8GAaKIsQuGQBEbpaYxbMQ2jinsuVUdIEeknabPZ800krhkhvCV"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  const errorMessage = () => {};

  return (
    <div>
      <h3 className="text-white">Stripe Checkout Loaded {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
