import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({ getMovieByImdbId, movie, reviews, setReviews }) => {

    const reviewBody = useRef();
    let params = useParams();
    const imdbId = params.imdbId;

    useEffect(() => {
        getMovieByImdbId(imdbId);
    }, [])

    const createReview = async (e) => {
        e.preventDefault();

        const review = reviewBody.current;

        try {
            await api.post("/api/v1/reviews", { reviewBody: review.value, imdbId: imdbId });
            const updatedReviews = [...reviews, { body: review.value }];
            review.value = "";
            setReviews(updatedReviews);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={createReview} revText={reviewBody} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews