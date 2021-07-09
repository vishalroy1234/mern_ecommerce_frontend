import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getProfile } from "./helper/userapicalls";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { API } from "../backend";

function ShowPurchases() {
  const { user, token } = isAuthenticated();

  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    getProfile(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data?.purchases);
        setPurchases(data?.purchases);
      }
    });
  }, []);

  return (
    <Base
      title="Your Purchase History!"
      description="Welcome to your past..."
      className="container bg-info p-4 mb-2"
    >
      <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">
        User Dashboard
      </Link>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Product Category</th>
            <th scope="col">Order Date</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price Per Item</th>
            <th scope="col">Transaction Id</th>
          </tr>
        </thead>
        <tbody>
          {purchases &&
            purchases.map((purchase, index) => {
              return (
                <tr key={index}>
                  <td className="w-25">
                    <img
                      src={`${API}/product/photo/${purchase._id}`}
                      className="border border-2 border-success me-2 w-25"
                      alt="product photo"
                    ></img>
                    <span className="lead">{purchase.name}</span>
                  </td>
                  <td>{purchase.category}</td>
                  <td>{purchase?.orderedOn ?? ""}</td>
                  <td>{purchase.quantity}</td>
                  <td>
                    {parseInt(purchase?.amount ?? 0) /
                      parseInt(purchase?.quantity ?? 1)}
                  </td>
                  <td>{purchase.transaction_id}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Base>
  );
}

export default ShowPurchases;
