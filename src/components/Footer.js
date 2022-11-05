import React from "react";

export default function Footer() {
  return (
    <div class="container">
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Top Rated
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Recent
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
        <div class="d-flex flex-column flex-md-row justify-content-between">
          <p class="text-center text-muted">&copy; 2021 Company, Inc</p>
          <div class="d-flex justify-content-center">
            <a href="#" class="text-muted mx-2">
              <i class="fa fa-2x fa-facebook-square"></i>
            </a>
            <a href="#" class="text-muted mx-2">
              <i class="fa fa-2x fa-twitter-square"></i>
            </a>
            <a href="#" class="text-muted mx-2">
              <i class="fa fa-2x fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
