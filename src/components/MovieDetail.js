import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ReviewTile from "./ReviewTile";
import { server } from "../App";

export default function MovieDetail() {
  let navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showRateBox, setShowRateBox] = useState(false);

  const [rate, setRate] = useState();
  const [review, setReview] = useState();

  const userid = window.localStorage.getItem("token");
  const displayName = window.localStorage.getItem("displayName");

  let params = useParams();
  let usertoken = window.localStorage.getItem("token");
  useEffect(() => {
    const fetchMovies = async () => {
      fetch(`${server}/movie/id/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data[0]);
        });
    };
    const fetchReviews = async () => {
      fetch(`${server}/reviews/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data.data);
        });
    };
    fetchMovies();
    fetchReviews();
  });

  const postReview = () => {
    fetch(`${server}/review`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        movieid: params.id,
        username: displayName,
        message: review,
        rating: rate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // console.log(data);
        }
      });
  };

  const updateRating = (avg_rating, rating_counts) => {
    let url = `${server}/movie/update/${params.id}`;
    fetch(url, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        avg_rating,
        rating_counts,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // console.log(data.data);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRateBox(false);
    if (rate === "0") {
      // console.log("Select Appropriate option");
      return;
    } else {
      if (movie.avg_rating === "0") {
        updateRating(rate, "1");
      } else {
        let currRate = parseInt(movie.avg_rating) + parseInt(rate);
        let currCount = parseInt(movie.rating_counts) + 1;
        updateRating(currRate.toString(), currCount.toString());
      }
      if (review !== "") {
        postReview();
      }
    }
  };

  if (movie) {
    return (
      <div className="container text-light">
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="my-0">{movie.movie_name}</h1>
            <div className="d-flex gap-3">
              <p className="my-0">{movie.release_date.substring(0, 4)}</p>
              <p className="my-0">PG-13</p>
              <p className="my-0">2h 3m</p>
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="d-flex flex-column align-items-center">
              <p className="my-1 h5 text-muted">Rating</p>
              <p className="my-1 h5 text-warning">
                <i className="fa fa-star mx-1"></i>
                <span className="text-light">
                  {(parseInt(movie.avg_rating) / parseInt(movie.rating_counts))
                    .toString()
                    .substring(0, 3) == "NaN"
                    ? 0
                    : (
                        parseInt(movie.avg_rating) /
                        parseInt(movie.rating_counts)
                      )
                        .toString()
                        .substring(0, 3)}
                  /10
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 d-flex gap-4 overflow-hidden flex-column flex-md-row">
          <div className="d-flex justify-content-center">
            <img src={movie.poster_image} alt="" height="400" />
          </div>

          <div className="video-responsive">
            <iframe
              src={`https://www.youtube.com/embed/${movie.trailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex gap-2">
            {movie.category.map((item, index) => (
              <div key={index} className="category">
                {item.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="row">
              <div className="col-md-8 overview px-md-4">
                <h4>Overview</h4>
                <p>{movie.overview}</p>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="my-0">Box-office Collection</p>
                  <p className="my-0">{movie.boxoffice_collection} Crore</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="my-0">Release Date</p>
                  <p className="my-0">{movie.release_date}</p>
                </div>
                <hr />
              </div>
              <div className="col-sm-12 col-md-4">
                <button
                  className="btn btn-watchlist"
                  onClick={async function () {
                    if (usertoken != null) {
                      await fetch(`${server}/${usertoken}/${params.id}/`)
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.status == "error") {
                            fetch(`${server}/watchlist`, {
                              method: "POST",
                              crossDomain: true,
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "Access-Control-Allow-Origin": "*",
                              },
                              body: JSON.stringify({
                                userid: usertoken,
                                movieid: params.id,
                              }),
                            })
                              .then((res) => res.json())
                              .then((data) => {
                                if (data.status === "ok") {
                                  alert("Movie Added Successful");
                                  navigate(`/`);
                                }
                              });
                          } else {
                            alert("Movie Already Exist in Watchlist");
                          }
                        });
                    } else {
                      navigate(`/login`);
                    }
                  }}
                >
                  <i className="fa fa-plus px-2"></i>
                  Add to Watchlist
                </button>
                <button
                  type="button"
                  className="btn btn-rate"
                  onClick={() => {
                    setShowRateBox(true);
                  }}
                >
                  <i className="fa fa-star mx-1"></i>
                  Rate
                </button>
                {showRateBox && (
                  <div className="ratebox">
                    {userid === null ? (
                      <div className="d-flex flex-column justify-content-center">
                        <p>Login into your account to rate the movie.</p>
                        <div className="justify-content-center d-flex">
                          <button
                            type="button"
                            className="btn btn-submit"
                            onClick={() => {
                              navigate(`/login`);
                            }}
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            className="btn btn-submit px-4 mx-2"
                            onClick={() => {
                              setShowRateBox(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-2">
                          <select
                            name="rate"
                            className="form-select"
                            onChange={(e) => {
                              setRate(e.target.value);
                            }}
                          >
                            <option value="0">Rate From 1-10</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            name="review_msg"
                            className="form-control"
                            placeholder="Write your review"
                            onChange={(e) => {
                              setReview(e.target.value);
                            }}
                          />
                        </div>
                        <div className="justify-content-center d-flex">
                          <button
                            type="submit"
                            className="btn btn-submit px-4 mx-2"
                          >
                            Post
                          </button>
                          <button
                            type="button"
                            className="btn btn-submit px-4 mx-2"
                            onClick={() => {
                              setShowRateBox(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-2 rounded w-100 overflow-auto reviewbox">
          <h4>Reviews</h4>
          {reviews != null ? (
            reviews.map((review, index) => (
              <ReviewTile
                key={index}
                username={review.username}
                rating={review.rating}
                message={review.message}
              />
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Loader />
      </div>
    );
  }
}
