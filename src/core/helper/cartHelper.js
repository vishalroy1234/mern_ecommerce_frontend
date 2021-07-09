export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let shouldANewProductBeAddedToCart = cart.every((product) => {
      if (product._id === item._id) {
        product.count += 1;
        return false;
      }
      return true;
    });
    if (shouldANewProductBeAddedToCart) {
      cart.push({ ...item, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
    return [];
  }
};

export const deleteItemFromCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.every((product) => {
        if (product._id === item._id) {
          if (product.count > 1) {
            product.count -= 1;
          } else {
            cart = cart.filter((product) => {
              return product._id !== item._id;
            });
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          next();
          return false;
        }
        return true;
      });
    }
  }
};

//after transaction is successful empty the cart in localStorage
export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    next();
  }
};
