import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "vishalroy.btech.cs18@iiitranchi.ac.in",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  // const errorMessage = () => {
  //   return (
  //     <div
  //       className="alert alert-danger"
  //       style={{ display: error ? "" : "none" }}
  //     >
  //       {error}
  //     </div>
  //   );
  // };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            didRedirect: false,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({ ...values, error: "", didRedirect: true });
          });
        }
      })
      .catch((err) => console.log("Error while signing in"));
  };

  const errorMessage = () => {
    return <div className="alert alert-danger">{error}</div>;
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    // if user is authenticated ie jwt is present in localStorage;then u don't have to show the signin page
    // whenever a user tries to access this page we redirect them to home page
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="container">
        {error ? errorMessage() : ""}
        {loadingMessage()}
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Base title="Sign in Page" description="A page for user to sign in!">
      {signInForm()}
      {performRedirect()}
      {JSON.stringify(values)}
    </Base>
  );
};

export default Signin;
