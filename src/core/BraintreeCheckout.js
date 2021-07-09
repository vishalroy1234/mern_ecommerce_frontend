import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { getmeToken, processPayment } from "./helper/paymentBHelper";

const BraintreeCheckout = ({ products, getAPageReload }) => {
  const instance = useRef();

  const { token, user } = isAuthenticated();

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: false,
  });

  useEffect(() => {
    isAuthenticated() && getToken();
  }, []);

  const getToken = () => {
    getmeToken(user._id, token).then((info) => {
      console.log("after calling getMeToken we get:", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        setInfo({ ...info, error: false, clientToken: info.clientToken });
      }
    });
  };

  const showIfUserIsNotAuthenticatedAndCartIsEmpty = () => {
    return isAuthenticated() ? (
      <h1>Please add something to your cart!!!</h1>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  const showBrainTreeDropIn = () => {
    return (
      <div>
        {isAuthenticated() && products.length > 0 && info.clientToken ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(get_instance) => {
                console.log("callback function of onInstance executing...");
                console.log("INSTANCE:", get_instance);
                instance.current = get_instance;
              }}
            />
            <div className="d-grid gap-2">
              <button
                className="btn btn-success btn-block"
                onClick={() => {
                  onPurchase();
                }}
              >
                Pay with braintree
              </button>
            </div>
          </div>
        ) : (
          showIfUserIsNotAuthenticatedAndCartIsEmpty()
        )}
      </div>
    );
  };

  const getFinalPrice = () => {
    return products.reduce((accumulator, curProduct) => {
      return accumulator + curProduct.count * curProduct.price;
    }, 0);
  };

  const getProductsInCart = () => {
    let productsInCart = [];
    products?.forEach((product) => {
      let name = product.name;
      let count = product.count;
      let price = product.price;
      productsInCart.push({
        product_id: product._id,
        name,
        count,
        price,
      });
    });
    return productsInCart;
  };

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    instance?.current?.requestPaymentMethod()?.then((data) => {
      console.log("what we get after requestPaymentMethod:", data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getFinalPrice(),
      };
      processPayment(user._id, token, paymentData)
        .then((response) => {
          console.log("process payment successful:", response);
          setInfo({ ...info, success: response.success, loading: false });

          //creating an order
          const ordeData = {
            products: getProductsInCart(),
            transaction_id: response.transaction.id,
            amount: parseFloat(response.transaction.amount),
            user: user?._id,
          };
          createOrder(user?._id, token, ordeData).then((data) => {
            console.log("order created in backend:", data);
            emptyCart(() => {
              getAPageReload();
            });
          });
        })
        .catch((err) => {
          setInfo({ ...info, loading: false, success: false });
        });
    });
  };

  return (
    <div>
      <h3>Your bill is {getFinalPrice()} $</h3>
      {showBrainTreeDropIn()}
    </div>
  );
};

export default BraintreeCheckout;
