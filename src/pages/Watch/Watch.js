import React, { useEffect  } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

import {
    getMovies,
    selectMovies,
} from './watchSlice';

import { Movie } from '../../components/Movie/Movie';

import styles from './Watch.module.css';

export function Watch() {
    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);

    useEffect(() => {
        dispatch(getMovies());
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                {movies.map((movie) => {
                    return (
                        <Movie
                            key={movie.imdb_id}
                            movie={movie}
                            onWatch={() => {
                                dispatch(getMovies());
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
