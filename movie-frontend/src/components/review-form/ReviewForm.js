import { Form } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, reviewBody, labelText, defaultValue }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
				<Form.Label>{labelText}</Form.Label>
				<Form.Control
					ref={reviewBody}
					as='textarea'
					rows={3}
					defaultValue={defaultValue}
				/>
			</Form.Group>
			{/* <Button variant="outline-info" onClick={handleSubmit}>Submit</Button> */}
		</Form>
	);
};

export default ReviewForm;
