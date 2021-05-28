import React, { useEffect  } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

import {
    getMovies,
    selectMovies,
} from './watchedSlice';

import { Movie } from '../../components/Movie/Movie';

import styles from './Watched.module.css';

export function Watched () {
    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);

    useEffect(() => {
        dispatch(getMovies());
    }, []);

    return (
        <div className={styles.list}>
            {movies.map((movie) => {
                return (
                    <Movie
                        key={movie.imdb_id}
                        movie={movie}
                        onWatch={() => {
                            dispatch(getMovies());
                        }}
                        onRemove={() => {
                            dispatch(getMovies());
                        }}
                        onLoad={() => {
                            dispatch(getMovies());
                        }}
                    />
                );
            })}
        </div>
    );
}
