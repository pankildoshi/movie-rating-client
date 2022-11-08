import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  });
  return (
    <>
      <div className="row top-rated">
        <div className="block mt4">
          <h1 className="text-white">Top Rated</h1>
          <p className="text-muted">
            You never wanna miss one of these, right!?
          </p>
        </div>
        <div className="slider">
          {movies.map((movie) => {
            return (
              <Card
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
            Really, You haven't watch these yet? Don't fall behind, Let's binge
            tonight!
          </p>
        </div>
        <div class="slider">
          {movies.reverse().map((movie) => {
            return (
              <Card
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
}
