/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

const API_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.VITE_API_KEY;

const AppContainer = styled.div`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
  width: 100vw;
`;

const Title = styled.h1`
  color: red;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 20px;
`;

const MovieCard = styled.div`
  background-color: #111;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const MovieTitle = styled.p`
  font-family: "Apple SD Gothic Neo", sans-serif;
  margin-top: 10px;
  font-size: 16px;
`;

const MovieRating = styled.p`
  font-size: 16px;
  color: yellow;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  gap: 20px;
  position: relative;
  max-width: 700px;
  color: white;
`;

const ModalPoster = styled.img`
  width: 150px;
  border-radius: 10px;
`;

const ModalInfo = styled.div`
  max-width: 500px;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMovie(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.className.includes("modal-overlay")) {
      setSelectedMovie(null);
    }
  };

  return (
    <AppContainer>
      <Title>Movie List</Title>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => setSelectedMovie(movie)}>
            <MoviePoster
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieRating>⭐{movie.vote_average}</MovieRating>
          </MovieCard>
        ))}
      </MovieGrid>

      {selectedMovie && (
        <ModalOverlay className="modal-overlay" onClick={handleOverlayClick}>
          <Modal>
            <ModalClose onClick={() => setSelectedMovie(null)}>&times;</ModalClose>
            <ModalPoster
              src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <ModalInfo>
              <h2>{selectedMovie.title}</h2>
              <p><strong>개봉일:</strong> {selectedMovie.release_date}</p>
              <p><strong>평점:</strong> ⭐ {selectedMovie.vote_average}</p>
              <p><strong>줄거리:</strong> {selectedMovie.overview}</p>
            </ModalInfo>
          </Modal>
        </ModalOverlay>
      )}
    </AppContainer>
  );
}

export default App;