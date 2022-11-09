import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  let navigate = useNavigate();
  let usertoken = window.localStorage.getItem("token");
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
        <button className="btn btn-wishlist" onClick={
          async function () {
            if (usertoken != null) {
              await fetch(`http://localhost:8000/watchlist/${usertoken}/${props.id}/`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.status == "error") {
                    fetch("http://localhost:8000/watchlist", {
                      method: "POST",
                      crossDomain: true,
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: JSON.stringify({
                        userid: usertoken,
                        movieid: props.id
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status === "ok") {

                          alert("Movie Added Successful");
                          window.location.href = "/";
                        }
                      });
                  }
                  else {
                    alert("Movie Already Exist in Watchlist");
                  }
                });
            }
            else {
              window.location.href = "/login";
            }

          }}>
          <i className="fa fa-bookmark"></i> Watchlist
        </button>
      </div>
    </div>
  );
}
