
import React, { useEffect, useState } from "react";
import Card from "./Card";


const Watchlist = () => {
    const [movies, setMovies] = useState([]);
    const [watchlistmovies, setMoviesFromWatchList] = useState([]);
    let usertoken = window.localStorage.getItem("token");
    useEffect(() => {
        fetch(`http://localhost:8000/watchlist/${usertoken}`)
            .then((res) => res.json())
            .then((data) => {
                setMoviesFromWatchList(data);
            });
        
    }, []);
    useEffect(() => {
        watchlistmovies.map(movie => {
            fetch(`http://localhost:8000/movie/id/${movie.movieid}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "error") {
                        window.localStorage.setItem("recentsearch", "movienotfound");
                    } else {
                        if(movies.includes(data[0]) === false)
                        {
                            setMovies(pre => ([...pre,data[0]]) );
                        }
                    }
                });
                
        })
    }, [watchlistmovies]);
    return (
        <div>
            {watchlistmovies.length}
            <div className="row top-rated">
                <div className="block mt4">
                    <h1 className="text-white">My WatchList</h1>
                    <p className="text-muted">Keep A Track of all your Favorite Movies</p>
                </div>
                <div class="slider">
                    {movies.length}
                    {movies.reverse().map((movie) => {
                      return (
                        <Card
                          watchlist="true"
                          id={movie._id}
                          movieName={movie.movie_name}
                          rating={movie.avg_rating}
                          img={movie.poster_image}
                        />
                      );
                    })}
                  </div>
            </div>
        </div>
    );
}

export default Watchlist;
