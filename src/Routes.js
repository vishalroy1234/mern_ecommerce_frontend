import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./styles.css";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import UpdateProfile from "./user/UpdateProfile";
import ShowPurchases from "./user/ShowPurchases";
import ChangePassword from "./user/ChangePassword";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/something" to="/cart" />

        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute
          path="/user/update/profile"
          exact
          component={UpdateProfile}
        />
        <PrivateRoute path="/user/purchases" exact component={ShowPurchases} />
        <PrivateRoute
          path="/user/update/password"
          exact
          component={ChangePassword}
        />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
