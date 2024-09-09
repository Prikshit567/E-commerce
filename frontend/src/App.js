import React, { useEffect, useState } from 'react'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import WebFont from "webfontloader";
import Home from './component/Home/Home';
import './App.css'
// import Loader from './component/layout/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import ProductDetails from "./component/Product/ProductDetails"
import { Route, Routes } from 'react-router-dom';
import Products from './component/Product/Products';
import LoginSignUp from './component/User/LoginSignUp';
import { store } from "./Redux/store"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from './Redux/slices/userSlice';
import UserOptions from './component/Header/UserOptions';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassowrd from './component/User/UpdatePassowrd';
import ForgetPassword from './component/User/ForgetPassword';
import ResetPassword from './component/User/ResetPassword'
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeWrapper from './component/Cart/StripeWrapper';
import OrderSuccess from "./component/Cart/OrderSuccess";
import Orders from "./component/Order/Orders"
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReview from './component/Admin/ProductReview';
import Page404 from './component/NotFound/Page404';




const App = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)
  }

  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);


  return (
    <div>

      <Header />
      {/* {isAuthenticated && <UserOptions user={user} />} */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/profile/update" element={<UpdateProfile />} />
        <Route exact path="/password/update" element={<UpdatePassowrd />} />
        <Route exact path="/password/reset" element={<ForgetPassword />} />

        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        {/* <Route exact path="/account" element={<Profile/>} /> */}

        <Route exact path="/cart" element={<Cart />} />

        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassowrd />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/reset"
          element={
            <ProtectedRoute>
              <ForgetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            // </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/process/payment"
          element={
            <ProtectedRoute>
              <StripeWrapper />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
         <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
         <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
         <Route
          exact
          path="/admin/allorders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />

<Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
         <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersList   />
            </ProtectedRoute>
          }
        />
         <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute>
              <UpdateUser   />
            </ProtectedRoute>
          }
        />

<Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <ProductReview   />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404/>} />
      </Routes>
      
      <Footer />
      <ToastContainer />

    </div>
  )
}

export default App
