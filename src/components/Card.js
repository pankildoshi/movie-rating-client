import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <img src={props.img} alt="movie poster" />
      <span className="rating">{props.rating}⭐</span>
      <div className="card-body">
        <p>{props.movieName}</p>
      </div>
      <div className="card-footer d-flex justify-content-center">
        <button className="btn btn-wishlist">
          <i className="fa fa-bookmark"></i> Watchlist
        </button>
      </div>
    </div>
  );
}
