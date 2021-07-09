import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addItemToCart, deleteItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, location, getAPageReload = null }) => {
  console.log(location);
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItemToCart(product, () => {
      return setRedirect(true);
    });
  };

  const deleteFromCart = () => {
    deleteItemFromCart(product, () => {
      return getAPageReload();
    });
  };

  const getARedirect = (redirect) => redirect && <Redirect to="/cart" />;
  console.log(location.pathname);
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <div className="rounded border border-success p-2">
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          {location.pathname === "/" && (
            <div className="col-12">
              <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to cart
              </button>
            </div>
          )}
          {location.pathname === "/cart" && (
            <div className="col-12">
              <button
                onClick={deleteFromCart}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
