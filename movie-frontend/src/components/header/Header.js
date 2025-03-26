import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Header = ({ loggedIn, setLoggedIn }) => {
	const navigate = useNavigate();

	function reviews(imdbId) {
		navigate(`/reviews/${imdbId}`);
	}

	const login = async e => {
		e.preventDefault();
		navigate('/login', { setLoggedIn });
	};

	const logout = async e => {
		e.preventDefault();

		try {
			await api.post('/users/logout', {
				withCredentials: true,
			});
			console.log('Logged out');
			setLoggedIn(false);
		} catch (err) {
			console.error(err);
		}
	};

	const register = async e => {
		e.preventDefault();
		navigate('/register', { setLoggedIn });
	};

	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container fluid>
				<Navbar.Brand href='/' style={{ color: 'gold' }}>
					<FontAwesomeIcon icon={faVideoSlash} />
					Gold
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						style={{ maxHeight: '100px' }}
						navbarScroll
					>
						<NavLink className='nav-link' to='/'>
							Home
						</NavLink>
						<NavLink className='nav-link' to='/watch-list'>
							Watch List
						</NavLink>
					</Nav>
					{!loggedIn ? (
						<>
							<Button variant='outline-info' className='me-2' onClick={login}>
								Login
							</Button>
							<Button
								variant='outline-info'
								className='me-2'
								onClick={register}
							>
								Register
							</Button>
						</>
					) : (
						<Button variant='outline-info' onClick={logout}>
							Logout
						</Button>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
