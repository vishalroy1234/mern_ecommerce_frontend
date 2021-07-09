import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    didRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    error,
    didRedirect,
    formData,
    createdProduct,
    photo,
  } = values;

  //jst consoling the categories
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            createdProduct: "",
            loading: false,
            didRedirect: false,
            category: "",
          });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
            didRedirect: true,
            category: "",
            error: "",
          });
        }
      })
      .catch((err) => console.log("Error occured while creating a product"));
  };

  const handleChange = (e) => {
    //e.target.files[0] means the first file
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const redirect = () => {
    return didRedirect && window.location.replace("/admin/dashboard");
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
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            type="file"
            name="photo"
            accept="image/*" // you will only be allowed to select image files.Rest file types will not be shown to u
            placeholder="choose a file"
          />
        </label>
      </div>
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
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={(e) => {
            handleChange(e);
          }}
          className="form-control"
          placeholder="Category"
          name="category"
        >
          {/* just to show the user that he needs to select something. See no value attribute is attached to it */}
          <option>Select</option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="number"
          className="form-control"
          placeholder="Quantity"
          name="stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3 mt-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4 mb-2"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          <p hidden={true}>
            {setTimeout(() => {
              redirect();
            }, 2000)}
          </p>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
