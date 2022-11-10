import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3"></ul>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <p className="text-center text-muted">
            Movie Rating &copy; {new Date().getFullYear()}
          </p>
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
