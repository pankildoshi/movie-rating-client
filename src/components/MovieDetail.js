import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import YoutubeEmbed from "./YoutubeEmbed";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);

  let params = useParams();
  useEffect(() => {
    const url = "http://localhost:8000/movie/id/" + params.id;
    const fetchData = async () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data[0]);
        });
    };
    fetchData();
  }, [params.id]);
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
                <i className="fa fa-star"></i>
                <span className="text-light">
                  {movie.avg_rating.substring(0, 3)}/10
                </span>
              </p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <p className="my-1 h5 text-muted">Your Rating</p>
              <p className="my-1 h5 text-primary">
                <i className="fa fa-star"></i>
                Rate
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
            {/* <img
              src="https://image.tmdb.org/t/p/w200/8S9kd6n2d6KpuNfqpTF8aMgYIg0.jpg"
              alt=""
              height="400"
            /> */}
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex gap-2">
            {movie.category.map((item) => (
              <div className="category">{item.toUpperCase()}</div>
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
                <button className="btn btn-rate">
                  <i className="fa fa-star"></i>
                  Rate
                </button>
                <button className="btn btn-watchlist">
                  <i className="fa fa-plus"></i>
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
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
