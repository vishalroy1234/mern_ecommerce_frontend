import { API } from "../../backend";
import React from "react";

const ImageHelper = ({ product }) => {
  return (
    <img
      src={
        product
          ? `${API}/product/photo/${product._id}`
          : "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      } //the src attribute will perform a GET request to our server and server will return an image which gets rendered in the browser.
      alt="photo"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      className="mb-3 rounded"
    />
  );
};

export default ImageHelper;
