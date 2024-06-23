import React from "react";
import { NavLink } from "react-router-dom";

function Signin() {
  return (
    <>
      <div class="bg-emerald-700 text-white flex h-screen items-center justify-center w-full">
        <div class="text-5xl text-center">Login</div>
      </div>
      <form className="pl-10 mt-8 w-full">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-2xl font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            className=" border border-black rounded w-1/3 py-2 px-3 text-gray-700 "
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-2xl font-bold mb-2"
            for="Email"
          >
            Email
          </label>
          <input
            className=" border border-black rounded w-1/3 py-2 px-3 text-gray-700 " id="username"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-2xl font-bold mb-2"
            for="Password"
          >
            Password
          </label>
          <input
            className=" border border-black rounded w-1/3 py-2 px-3 text-gray-700 "id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="mt-8 mb-10">
          <input
            className="  border bg-green-600 border-b-slate-900 rounded  py-2 px-3 text-white "
            id="LoginButton"
            type="submit"
            placeholder="Login"
            value="Login"
          />
        </div>

        <p className="text-xl">
          If you are new Student, Kindly Register by clicking below
          <div className="text-2xl text-blue-600">
            <NavLink to={"/Register"}>Register Now</NavLink>
          </div>
        </p>
      </form>
    </>
  );
}

export default Signin;
