
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
        // watchlistmovies.map(movie => {
        //     fetch(`http://localhost:8000/movie/${movie.movieid}`)
        //         .then((res) => res.json())
        //         .then((data) => {
        //             if (data.status === "error") {
        //                 window.localStorage.setItem("recentsearch", "movienotfound");
        //             } else {
        //                 setMovies(data);
        //             }
        //         });
        // })
    }, []);
    return (
        <div>
            <div className="row top-rated">
                <div className="block mt4">
                    <h1 className="text-white">Search Result</h1>
                    <p className="text-muted">Result for Your Searched Movie</p>
                </div>
                
            </div>
        </div>
    );
}

export default Watchlist;
