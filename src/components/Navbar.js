import React from "react";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">
          Movie Rating
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li>
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Top Rated
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Recently Released
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                About
              </a>
            </li>
            <li>
              <a class="btn nav-btn mx-lg-2" href="login.html">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
