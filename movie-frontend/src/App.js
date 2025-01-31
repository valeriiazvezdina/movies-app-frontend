import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';

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

    </div>
  );
}

export default App;
