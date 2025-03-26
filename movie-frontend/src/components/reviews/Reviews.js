import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import ReviewForm from '../review-form/ReviewForm';

import React from 'react';

const Reviews = ({ getMovieByImdbId, movie, reviews, setReviews }) => {
	const reviewBody = useRef();
	let params = useParams();
	const imdbId = params.imdbId;

	useEffect(() => {
		getMovieByImdbId(imdbId);
	}, []);

	const createReview = async e => {
		e.preventDefault();

		let review = reviewBody.current.value;

		try {
			await api.post('/reviews', { reviewBody: review, imdbId: imdbId });
			const updatedReviews = [...reviews, { body: review }];
			// TODO: change clearing the review to get request OR do not show there the review and move it to another section
			review = '';
			setReviews(updatedReviews);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<h3>Reviews</h3>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<img src={movie?.poster} alt={movie?.title} />
				</Col>
				<Col key={movie?.imdbId}>
					{
						<>
							<Row>
								<Col>
									<ReviewForm
										handleSubmit={createReview}
										reviewBody={reviewBody}
										labelText='Write a Review?'
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<hr />
								</Col>
							</Row>
						</>
					}
					{reviews?.map((r, i) => {
						return (
							<React.Fragment key={i}>
								<Row>
									<Col>{r.body}</Col>
								</Row>
								<Row>
									<Col>
										<hr />
									</Col>
								</Row>
							</React.Fragment>
						);
					})}
				</Col>
			</Row>
			<Row>
				<Col>
					<hr />
				</Col>
			</Row>
		</Container>
	);
};

export default Reviews;
