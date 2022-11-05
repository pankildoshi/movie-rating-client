import React from "react";

export default function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Recent
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              About
            </Link>
          </li>
        </ul>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <p className="text-center text-muted">&copy; 2021 Company, Inc</p>
          <div className="d-flex justify-content-center">
            <Link to="#" className="text-muted mx-2">
              <i className="fa fa-2x fa-facebook-square"></i>
            </Link>
            <Link to="#" className="text-muted mx-2">
              <i className="fa fa-2x fa-twitter-square"></i>
            </Link>
            <Link to="#" className="text-muted mx-2">
              <i className="fa fa-2x fa-instagram"></i>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
