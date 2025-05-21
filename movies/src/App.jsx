import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";  

const API_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL, {
        params: {
          api_key: API_KEY,
          language: "ko-KR",
          page: 1,
          sort_by: "popularity.desc",
          include_adult: false,
          include_video: false,
        },
      })
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <h1>Movie List</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              className="movie-poster"
            />
            <p className="movie-title">{movie.title}</p>
            <p className="movie-rating">⭐{movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;