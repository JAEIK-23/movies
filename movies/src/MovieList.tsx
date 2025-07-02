import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";
import { Movie } from "./types";

const API_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.VITE_API_KEY as string;

const fetchMovies = async (): Promise<Movie[]> => {
  const res = await axios.get<{ results: Movie[] }>(API_URL, {
    params: {
      api_key: API_KEY,
      language: "ko-KR",
      page: 1,
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
    },
  });
  return res.data.results;
};

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

interface Props {
  onSelect: (movie: Movie) => void;
}

const MovieList = ({ onSelect }: Props) => {
  const { data: movies = [] } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  return (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} onClick={() => onSelect(movie)}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRating>⭐{movie.vote_average}</MovieRating>
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MovieList;