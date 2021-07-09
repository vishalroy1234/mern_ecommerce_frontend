import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/user/update/profile">
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/user/purchases">
              My Purchases
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/user/update/password">
              Change Password
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to user area"
      description="Manage your profile here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{userLeftSide()}</div>
        <div className="col-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashboard;
