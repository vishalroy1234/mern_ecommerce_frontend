import React, { useState } from "react";
import { isAuthenticated, signout } from "../auth/helper";
import { updateProfile } from "./helper/userapicalls";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4>Password Updated successfully</h4>
    </div>
  );
  const redirect = () => {
    return (
      success &&
      signout(() => {
        window.location.replace("/signin");
      })
    );
  };

  const errorMessage = () => (
    <div
      className="alert alert-warning mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info mt-3">
          <h2>Updating Password...</h2>
        </div>
      )
    );
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const onUpdate = (e) => {
    e.preventDefault();
    console.log("onUpdate running");
    setLoading(true);
    setSuccess(false);
    setError("");
    updateProfile(user._id, token, { password }).then((data) => {
      console.log("DATA", data);
      if (data.error) {
        console.log(error);
        setLoading(false);
        setSuccess(false);
        setError(data.error);
      } else {
        console.log("onUpdate DATA", data);
        setLoading(false);
        setSuccess(true);
        setError("");
        setPassword("");
      }
    });
  };

  const createPasswordForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="name"
          className="form-control"
          placeholder="New Password"
          value={password}
          type="password"
        />
      </div>

      <button
        type="submit"
        onClick={(e) => {
          onUpdate(e);
        }}
        className="btn btn-outline-success mb-3 mt-3"
      >
        Change Password
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4 mb-2"
    >
      <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">
        User Dashboard
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3">
          <div className="alert alert-info mt-3">
            <h2>You have to sign in again after changing your password</h2>
          </div>
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {createPasswordForm()}
          <p hidden={true}>
            {setTimeout(() => {
              redirect();
            }, 1000)}
          </p>
        </div>
      </div>
    </Base>
  );
};

export default ChangePassword;
