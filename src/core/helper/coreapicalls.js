import { API } from "../../backend";

//get all products
export const getAllProducts = async () => {
  let response = await fetch(`${API}/products`, {
    method: "GET",
    Accept: "application/json",
  });
  let json = await response.json();
  return json;
};
