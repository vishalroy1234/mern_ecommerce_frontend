import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getACategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({
  match: {
    params: { categoryId },
  },
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getACategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
        setName("");
      } else {
        setName(data.name);
        setError("");
        setSuccess(false);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
    setError(""); // above 2 setState will be batched and the component will be rerendered only once
  };

  const redirect = () => {
    return success && window.location.replace("/admin/dashboard");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //backend request firing
    updateCategory(categoryId, user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const errorMessage = () => {
    return error ? <h4 className="text-danger">{error}</h4> : "";
  };

  const successMessage = () => {
    return success ? (
      <h4 className="text-success">Category updated successfully</h4>
    ) : (
      ""
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For ex. Summer"
            onChange={(e) => handleChange(e)}
            value={name}
          />
          <button onClick={handleUpdate} className="btn btn-outline-info mb-2">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
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

export default UpdateCategory;
