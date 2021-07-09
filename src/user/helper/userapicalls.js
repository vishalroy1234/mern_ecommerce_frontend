import { API } from "../../backend";

export const getProfile = async (userId, token) => {
  const response = await fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};

export const updateProfile = async (userId, token, updatedData) => {
  let url = updatedData?.password
    ? `${API}/user/password/${userId}`
    : `${API}/user/${userId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  const json = await response.json();
  return json;
};

export const getAllOrdersOfAUser = async (userId, token) => {
  let response = await fetch(`${API}/order/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};
