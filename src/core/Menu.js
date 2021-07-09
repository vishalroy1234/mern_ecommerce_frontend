import React from "react";
import { Link, NavLink, Redirect, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

// changes the colour of active and inactive links
const currentTab = (location, path) => {
  if (location.pathname === path) {
    // active links
    return { color: "#2ecc72" };
  } else {
    // inactive links
    return { color: "#FFFFFF" };
  }
};

// we can access history,location,match in Menu because of withRouter and because Menu is inside BrowserRouter
const Menu = ({ history, location }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(location, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(location, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {isAuthenticated() && (
        <li className="nav-item">
          <Link
            style={currentTab(location, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            User Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={currentTab(location, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              style={currentTab(location, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(location, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Signin
            </Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
