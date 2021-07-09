import { API } from "../../backend";

export const getmeToken = (userId, token) => {
  console.log("step 1: asking backend to give me a token of Braintree");
  return fetch(`${API}/payment/getToken/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(
        "getting a token/response of Braintree from backend",
        response
      );
      return response.json();
    })
    .catch((err) => console.log("error in getting token from backend:", err));
};

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
