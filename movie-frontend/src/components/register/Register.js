import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Error from '../error/Error';

function Register({ setLoggedIn }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [unregistered, setUnregistered] = useState(false);

	const navigate = useNavigate();

	const register = async e => {
		e.preventDefault();

		try {
			await api.post(
				'/users/register',
				{ email, password },
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			console.log('Registered', email, password);
			setLoggedIn(true);
			navigate('/');
		} catch (err) {
			console.error(err);
			setUnregistered(true);
		}
	};

	return (
		<div className='text-center'>
			{unregistered && <Error message={'Email is already taken'} />}

			<form className='form-signin' onSubmit={register}>
				<h1 className='h3 mb-3 font-weight-normal'>Please register</h1>

				<label htmlFor='inputEmail' className='visually-hidden'>
					Email address
				</label>
				<input
					type='email'
					id='inputEmail'
					className='form-control'
					placeholder='Email address'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required={true}
					aria-label='Email address'
				/>

				<label htmlFor='inputPassword' className='visually-hidden'>
					Password
				</label>
				<input
					type='password'
					id='inputPassword'
					className='form-control'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required={true}
					aria-label='Password'
				/>

				<button className='btn btn-lg btn-primary btn-block' type='submit'>
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
