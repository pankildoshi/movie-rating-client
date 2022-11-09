import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Home() {
  const searchmovietoken = window.localStorage.getItem("recentsearch");
  const [searchedmovie, searchForMovie] = useState(["bleach"]);
  const performMovieSearch = () => {
    fetch(`http://localhost:8000/movie/${searchedmovie}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          window.localStorage.setItem("recentsearch", "movienotfound");
        } else {
          setMovies(data);
          window.localStorage.setItem("recentsearch", "moviesearched");
        }
      });
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        window.localStorage.setItem("recentsearch", "displayallmovies");
      });
  }, []);
  return (
    <>
      <div className="input-group my-4 w-50 container">
        <input
          type="text"
          className="form-control"
          placeholder="Search For Movie"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => searchForMovie(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-submit btn-lg"
            onClick={performMovieSearch}
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {(() => {
          if (searchmovietoken === "displayallmovies") {
            return (
              <>
                <div className="row top-rated">
                  <div className="block">
                    <h1 className="text-white">Top Rated</h1>
                    <p className="text-muted">
                      You never wanna miss one of these, right!?
                    </p>
                  </div>
                  <div className="slider">
                    {movies.map((movie) => {
                      return (
                        <Card
                          id={movie._id}
                          movieName={movie.movie_name}
                          rating={movie.avg_rating}
                          img={movie.poster_image}
                        />
                      );
                    })}
                  </div>
                </div>
                <div class="row new-releases">
                  <div class="block mt4">
                    <h1 class="text-white">New Releases</h1>
                    <p class="text-muted">
                      Really, You haven't watch these yet? Don't fall behind,
                      Let's binge tonight!
                    </p>
                  </div>
                  <div class="slider">
                    {movies.reverse().map((movie) => {
                      return (
                        <Card
                          id={movie._id}
                          movieName={movie.movie_name}
                          rating={movie.avg_rating}
                          img={movie.poster_image}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            );
          } else if (searchmovietoken === "moviesearched") {
            return (
              <div className="row top-rated">
                <div className="block mt4">
                  <h1 className="text-white">Search Result</h1>
                  <p className="text-muted">Result for Your Searched Movie</p>
                </div>
                <div className="slider">
                  {Array.isArray(movies) ? (
                    movies.map((movie) => {
                      return (
                        <Card
                          id={movie._id}
                          movieName={movie.movie_name}
                          rating={movie.avg_rating}
                          img={movie.poster_image}
                        />
                      );
                    })
                  ) : (
                    <p className="text-muted">No Movie Found..</p>
                  )}
                </div>
              </div>
            );
          }
        })()}
      </div>
    </>
  );
}
