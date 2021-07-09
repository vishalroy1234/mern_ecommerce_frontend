import { API } from "../../backend"; //API means: http://localhost:7000/api

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      //Accept header is a way for a client to specify the media type of
      //the response content it is expecting and Content-type is a way to
      //specify the media type of request being sent from the client to the server
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    //This can be used to detect whether code is running in a typical browser environment or not
    // logout user from frontend
    localStorage.removeItem("jwt");
    next();

    /*That is, it runs the code below next() after all middleware function finished.
    However, if you use return next(), it will jump out the callback immediately 
    and the code below return next() in the callback will be unreachable. */

    return fetch(`${API}/signout`, {
      // logout user from backend
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

//associated method with signin
//next parameter is just a simple variable which will be assigned to a callback function from the signin method
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    // that means window object is not available to us
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
