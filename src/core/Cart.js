import React, { useState, useEffect, useRef } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import BraintreeCheckout from "./BraintreeCheckout";

const Cart = ({ location, history }) => {
  const isMounted = useRef(false);

  const [products, setProducts] = useState([]);

  const getAPageReload = () => {
    // all three works fine for reloading a page
    // Method1: window.location.reload();
    history.push("/something"); //Method3: But u must add this to ur routes: <Redirect from='/something' to='/cart'/>
    //Prefer to use method3 way because page reloading is smooth here
  };

  useEffect(() => {
    setProducts(loadCart());
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadAllProducts = () => {
    return (
      <div>
        <h1>here load all the products</h1>
        {products &&
          products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                location={location}
                getAPageReload={getAPageReload}
              />
            );
          })}
      </div>
    );
  };

  const loadCheckoutForStripe = () => {
    return (
      <StripeCheckout products={products} getAPageReload={getAPageReload} />
    );
  };

  const loadCheckoutForBraintree = () => {
    return (
      <BraintreeCheckout products={products} getAPageReload={getAPageReload} />
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckoutForBraintree()}</div>
      </div>
    </Base>
  );
};

export default Cart;
