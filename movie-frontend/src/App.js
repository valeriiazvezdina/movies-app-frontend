import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layjout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get('/movies');
      setMovies(response.data);
    }
    catch (err) {
      console.error(err);
    }
  };

  const getMovieByImdbId = async (imdbId) => {

    try {
      const response = await api.get(`/movies/${imdbId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    }
    catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
