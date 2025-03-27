import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';

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
					<p>
						<strong>Release Date:</strong> {movie.releaseDate}
					</p>
					<p>
						<strong>Genres:</strong> {movie.genres?.join(', ')}
					</p>
					<p>
						<strong>Trailer link:</strong>{' '}
						<a
							href={movie.trailerLink}
							target='_blank'
							rel='noopener noreferrer'
						>
							<Button variant='danger' size='sm'>
								Watch Trailer
							</Button>
						</a>
					</p>
				</Col>
			</Row>

			<Row>
				<Col>
					<h4>Reviews:</h4>
					{reviews.length === 0 ? (
						<p>No reviews yet.</p>
					) : (
						<ul className='list-unstyled'>
							{reviews.map((review, index) => (
								<li key={index} className='mb-2 p-2 border rounded'>
									{review.body}
								</li>
							))}
						</ul>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MovieDetails;
