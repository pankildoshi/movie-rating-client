import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Login() {
  return (
    <div className="container-fluid">
      <div className="container form-transparent justify-content-center my-5 p-3">
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link active text-white"
              id="tab-login"
              data-bs-toggle="pill"
              data-bs-target="#pills-login"
              to="#"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link  text-white"
              id="tab-register"
              data-bs-toggle="pill"
              to="#"
              data-bs-target="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Sign Up
            </Link>
          </li>
        </ul>

        <div className="tab-content">
          {/* <!-- Sign in Form --> */}
          <LoginForm />
          {/* <!-- Sign in Form Ended --> */}

          {/* <!-- Sign up Form --> */}
          <RegisterForm />
          {/* <!-- Sign up Form Ended --> */}
        </div>
      </div>

      <div className="concord-img-wrapper">
        <img
          className="concord-img vlv-creative"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          srcset="https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
          alt=""
        />
        <div className="concord-img-gradient"></div>
      </div>
    </div>
  );
}
