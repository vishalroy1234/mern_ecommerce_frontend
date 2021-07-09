import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getProfile, updateProfile } from "./helper/userapicalls";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    userinfo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, lastname, userinfo } = user;

  const { user: u, token } = isAuthenticated();
  useEffect(() => {
    getProfile(u._id, token).then((data) => {
      console.log("useEffect DATA", data);
      if (data.error) {
        console.log(data.error);
      } else {
        setUser({
          name: data.name,
          lastname: data?.lastname ?? "",
          userinfo: data?.userinfo ?? "",
        });
      }
    });
  }, []);

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4>Profile Updated successfully</h4>
    </div>
  );
  const redirect = () => {
    return success && window.location.replace("/user/dashboard");
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
          <h2>Updating...</h2>
        </div>
      )
    );
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    console.log("onUpdate running");
    setLoading(true);
    setSuccess(false);
    setError("");
    updateProfile(u._id, token, user).then((data) => {
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
        setUser({ name: "", lastname: "", userinfo: "" });
      }
    });
  };

  const createProfileForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lastname"
          value={lastname}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          name="userinfo"
          className="form-control"
          placeholder="Something about you..."
          value={userinfo}
        />
      </div>

      <button
        type="submit"
        onClick={(e) => {
          onUpdate(e);
        }}
        className="btn btn-outline-success mb-3 mt-3"
      >
        Update Profile
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
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {createProfileForm()}
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

export default UpdateProfile;
