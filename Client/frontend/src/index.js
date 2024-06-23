import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import AdminOnly from "./Components/Admin/AdminOnly";
import SignOut from "./Components/SignOut/SignOut";
import Signin from "./Components/SignIn/Signin";
import Outpass from "./Components/CreateOutpass/Outpass";
import History from "./Components/Outpass_History/History"; 
import Register from "./Components/Register/Register";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route path="About Us" element={<About />} />
      <Route path="Sign In" element={<Signin />} />
      <Route path="Admin" element={<AdminOnly />} />
      <Route path="Sign Out" element={<SignOut />} />
      <Route path="Create Outpass" element={<Outpass />} />
      <Route path="Outpass" element={<History />} />
      <Route path="Register" element={<Register />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);










// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
