import React, { useEffect, useState } from "react";
import Card from "./Card";
import { server } from "../App";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [watchlistmovies, setMoviesFromWatchList] = useState([]);
  let usertoken = window.localStorage.getItem("token");
  useEffect(() => {
    fetch(`${server}/watchlist/${usertoken}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesFromWatchList(data);
      });
  }, []);
  useEffect(() => {
    if (watchlistmovies.length > 0 && watchlistmovies) {
      watchlistmovies.map((movie) => {
        fetch(`${server}/movie/id/${movie.movieid}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "error") {
              window.localStorage.setItem("recentsearch", "movienotfound");
            } else {
              if (movies.includes(data[0]) === false) {
                setMovies((pre) => [...pre, data[0]]);
              }
            }
          });
      });
    }
  }, [watchlistmovies]);
  return (
    <div>
      <div className="row top-rated">
        <div className="block mt4">
          <h1 className="text-white">My WatchList</h1>
          <p className="text-muted">Keep A Track of all your Favorite Movies</p>
        </div>
        <div className="slider">
          {movies && movies.length > 0 && Array.isArray(movies) ? (
            movies.reverse().map((movie) => {
              let rating = (
                parseInt(movie.avg_rating) / parseInt(movie.rating_counts)
              )
                .toString()
                .substring(0, 3);
              return (
                <Card
                  key={movie._id}
                  id={movie._id}
                  watchlist="true"
                  movieName={movie.movie_name}
                  rating={rating == "NaN" ? 0 : rating}
                  img={movie.poster_image}
                />
              );
            })
          ) : (
            <p className="text-muted">No Movie Found..</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
