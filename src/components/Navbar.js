import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
              <Link to="/login" className="btn nav-btn mx-lg-2">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
