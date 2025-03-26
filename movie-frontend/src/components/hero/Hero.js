import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper } from '@mui/material';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-material-ui-carousel';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = ({ movies }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [selectedMovie, setSelectedMovie] = React.useState(null);

	const navigate = useNavigate();

	function reviews(imdbId) {
		navigate(`/reviews/${imdbId}`);
	}

	function MyVerticallyCenteredModal(props) {
		if (!props.movie) return null;

		return (
			<Modal
				{...props}
				size='sm'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Movie details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<strong>Genre:</strong> {props.movie.genres.join(', ')}
					</p>
					<p>
						<strong>Release Date:</strong> {props.movie.releaseDate}
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='info' onClick={props.onHide}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	return (
		<div className='movie-carousel-container'>
			<Carousel>
				{movies?.map(movie => (
					<Paper key={movie.imdbId}>
						<div className='movie-card-container'>
							<div
								className='movie-card'
								style={{
									'--img': `url(${movie.backdrops?.[0] || defaultBackdrop})`,
								}}
							>
								<div className='movie-details'>
									<div className='movie-poster'>
										<img src={movie.poster} alt={movie.title} />
									</div>
									<div className='movie-title'>
										<h1>{movie.title}</h1>
									</div>
									<div className='movie-buttons-container'>
										<Link
											to={`/trailer/${movie.trailerLink.substring(
												movie.trailerLink.length - 11
											)}`}
										>
											<div className='play-button-icon-container'>
												<FontAwesomeIcon
													className='play-button-icon'
													icon={faCirclePlay}
												/>
											</div>
										</Link>

										<div className='movie-buttons-reviews-details'>
											<div className='movie-review-button-container'>
												<Button
													variant='info'
													onClick={() => reviews(movie.imdbId)}
													style={{ marginBottom: '10px', width: '100px' }}
												>
													Reviews
												</Button>
											</div>

											<div className='movie-details-button-container'>
												<Button
													variant='info'
													style={{
														width: '100px',
													}}
													onClick={() => {
														setModalShow(true);
														setSelectedMovie(movie);
													}}
												>
													Details
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Paper>
				))}
			</Carousel>
			<MyVerticallyCenteredModal
				movie={selectedMovie}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
};

export default Hero;
