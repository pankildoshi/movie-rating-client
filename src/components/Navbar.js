import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [name, setName] = useState("");
  const [password, setNewPassword] = useState("");
  const token = window.localStorage.getItem("token");
  function getName() {
    const url = "http://localhost:8000/user/id/" + token;
    fetch(url).then((res) =>
      res.json().then((data) => {
        setName(data.username);
      })
    );
    return name;
  }
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
              <Link to="#" className="nav-link">
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link">
                Recently Released
              </Link>
            </li>

            <li>
              <Link to="#" className="nav-link">
                About
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
                <div class="dropdown">
                  <button class="btn nav-btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome: {getName()}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Change Password</a>

                    </li>
                    <li><a class="dropdown-item" onClick={() => {
                      window.localStorage.removeItem("token")
                      window.location.href = "/login";
                    }} href="#">Logout</a></li>
                  </ul>
                </div>

              )}
            </li>
          </ul>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Change Your Password</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <input type="password" className="form-control" placeholder="Enter Your New Password" onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-success" onClick={() => {
                    console.log(name);
                    fetch(`http://localhost:8000/user/${name}`, {
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
                          window.localStorage.removeItem("token")
                          window.location.href = "/login";
                        } else {
                        }
                      });
                  }}>Update Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
