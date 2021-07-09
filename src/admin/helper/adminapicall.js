import { API } from "../../backend";

//category calls

//create a category
export const createCategory = async (userId, token, category) => {
  let response = await fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(category), // body data type must match "Content-Type" header
  });
  let json = await response.json();
  return json; // returning a Promise
};

//get all categories
export const getAllCategories = async () => {
  let response = await fetch(`${API}/categories`, {
    method: "GET",
    Accept: "application/json",
  });
  return await response.json();
};

//delete a category
export const deleteCategory = async (categoryId, userId, token) => {
  let response = await fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  let json = await response.json();
  return json; // returning a Promise
};

//READ:get a category
export const getACategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//update a category
export const updateCategory = async (categoryId, userId, token, category) => {
  let response = await fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  let json = await response.json();
  return json; // returning a Promise
};

//product calls

//create a product
export const createProduct = async (userId, token, product) => {
  let response = await fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      // fetch by default sets the content-type if it sees a form data as the value of body
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: product,
  });

  let json = await response.json();
  return json; // returning a Promise
};

//get all products
export const getAllProducts = async () => {
  let response = await fetch(`${API}/products`, {
    method: "GET",
    Accept: "application/json",
  });
  let json = await response.json();
  return json;
};

//delete a product
export const deleteProduct = async (productId, userId, token) => {
  let response = await fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  let json = await response.json();
  return json; // returning a Promise
};
//READ:get a product
export const getAProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//update a product
export const updateProduct = async (productId, userId, token, product) => {
  let response = await fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: product,
  });

  let json = await response.json();
  return json; // returning a Promise
};
