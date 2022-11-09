import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  let navigate = useNavigate();
  return (
    <div className="card">
      <img
        src={props.img}
        alt="movie poster"
        onClick={() => {
          navigate(`/movies/${props.id}`);
        }}
      />
      <span className="rating">{props.rating.substring(0, 3)}⭐</span>
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
