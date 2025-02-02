import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './api/axiosConfig';
import Layout from './components/Layjout';
import Header from './components/header/Header';
import Home from './components/home/Home';
import NotFound from './components/not-found/NotFound';
import Reviews from './components/reviews/Reviews';
import Trailer from './components/trailer/Trailer';

function App() {
	const [movies, setMovies] = useState();
	const [movie, setMovie] = useState();
	const [reviews, setReviews] = useState([]);

	const getMovies = async () => {
		try {
			const response = await api.get('/movies');
			setMovies(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const getMovieByImdbId = async imdbId => {
		try {
			const response = await api.get(`/movies/${imdbId}`);
			const movie = response.data;

			setMovie(movie);
			setReviews(movie.reviewIds.map(review => review.body));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home movies={movies} />} />
					<Route path='/trailer/:ytTrailerId' element={<Trailer />}></Route>
					<Route
						path='/reviews/:imdbId'
						element={
							<Reviews
								getMovieByImdbId={getMovieByImdbId}
								movie={movie}
								reviews={reviews}
								setReviews={setReviews}
							/>
						}
					></Route>
					<Route path='*' element={<NotFound />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
