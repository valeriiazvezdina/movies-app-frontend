import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';


const Hero = ({ movies }) => {
    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies?.map((movie, imdbId) => (
                        <Paper key={imdbId}>
                            <div className='movie-card-container'>
                                <div className='movie-card'>
                                    <div className='movie-details'>
                                        <div className='movie-poster'>
                                            <img src={movie.poster} alt={movie.title} />
                                        </div>
                                        <div className='movie-title'>
                                            <h1>{movie.title}</h1>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Paper>
                    ))
                }
            </Carousel>
        </div>
    );
}

export default Hero;