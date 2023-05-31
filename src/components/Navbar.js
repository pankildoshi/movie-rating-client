import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../App";

export default function Navbar() {
  let navigate = useNavigate();

  const [password, setNewPassword] = useState("");
  const token = window.localStorage.getItem("token");
  const displayName = window.localStorage.getItem("displayName");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Movie Rating
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              {token != null ? (
                <Link to="/watchlist" className="nav-link">
                  My WatchList
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li>
              {token == null ? (
                <Link to="/login" className="btn nav-btn mx-lg-2">
                  Login
                </Link>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn nav-btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome {displayName}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#passwordChangeModal"
                      >
                        Change Password
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          window.localStorage.removeItem("token");
                          window.localStorage.removeItem("displayName");
                          navigate(`/login`);
                        }}
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
          <div
            className="modal fade"
            id="passwordChangeModal"
            tabIndex="-1"
            aria-labelledby="passwordChangeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="passwordChangeModalLabel">
                    Change Your Password
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      fetch(`${server}/user/update/${displayName}`, {
                        method: "PUT",
                        crossDomain: true,
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                          password,
                        }),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log(data);
                          if (data.status === "ok") {
                            alert("User Password Changed");
                            window.localStorage.removeItem("token");
                            window.localStorage.removeItem("displayName");
                            navigate(`/login`);
                          } else {
                          }
                        });
                    }}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
