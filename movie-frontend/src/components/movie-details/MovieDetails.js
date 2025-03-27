import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { Container, Row, Col } from 'react-bootstrap';

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const response = await api.get(`/movie-details/${id}`);
				setMovie(response.data.movie);
				setReviews(response.data.reviews);
			} catch (error) {
				console.error('Failed to load movie details:', error);
			}
		};

		fetchDetails();
	}, [id]);

	if (!movie) return <p>Loading...</p>;

	return (
		<Container>
			<Row className='my-4'>
				<Col md={4}>
					<img
						src={movie.poster}
						alt={movie.title}
						className='img-fluid rounded shadow'
					/>
				</Col>
				<Col md={8}>
					<h2>{movie.title}</h2>
					<p><strong>Release Date:</strong> {movie.releaseDate}</p>
					<p><strong>Description:</strong> {movie.description}</p>
					<p><strong>Genres:</strong> {movie.genres?.join(', ')}</p>
					<p><strong>Actors:</strong> {movie.actors?.join(', ')}</p>
				</Col>
			</Row>

			<Row>
				<Col>
					<h4>Reviews:</h4>
					{reviews.length === 0 ? (
						<p>No reviews yet.</p>
					) : (
						reviews.map((review, index) => (
							<div key={index} className='mb-3 p-2 border rounded'>
								<p>{review.text}</p>
								<small className='text-muted'>
									{review.userEmail} | Rating: {review.rating} | {new Date(review.createdAt).toLocaleString()}
								</small>
							</div>
						))
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MovieDetails;