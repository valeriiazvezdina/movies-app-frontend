function Error({ message }) {
	return (
		<div
			className='text-center'
			style={{
				position: 'fixed',
				bottom: '1rem',
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 1050,
			}}
		>
			<div
				className='toast show bg-danger text-white'
				role='alert'
				aria-live='assertive'
				aria-atomic='true'
			>
				<div className='toast-body'>{message}</div>
			</div>
		</div>
	);
}

export default Error;
