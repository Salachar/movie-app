import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getSuggestions,
    selectSuggestions,
} from './searchSlice';
import {
    getMovies as getUnwatchedMovies,
    selectMoviesByID as selectUnwatchedMovies,
} from '../Watch/watchSlice';
import {
    getMovies as getWatchedMovies,
    selectMoviesByID as selectWatchedMovies,
} from '../Watched/watchedSlice';

import { Movie } from '../../components/Movie/Movie';

import styles from './Search.module.css';

export function Search() {
    const dispatch = useDispatch();
    const suggestions = useSelector(selectSuggestions);
    const watched_movies = useSelector(selectWatchedMovies);
    const unwatched_movies = useSelector(selectUnwatchedMovies);

    useEffect(() => {
        dispatch(getUnwatchedMovies());
        dispatch(getWatchedMovies());
    }, []);

    return (
        <div>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    placeholder="Search for movies"
                    onKeyUp={(e) => {
                        const { key, currentTarget } = e;
                        if (key.toLowerCase() !== 'enter') return;
                        const search_text = currentTarget.value;
                        dispatch(getSuggestions(search_text));
                    }}
                />
            </div>

            <div className={styles.results}>
                {suggestions.map((suggestion) => {
                    return (
                        <Movie
                            key={suggestion.imdb_id}
                            movie={suggestion}
                            add
                            onAdd={() => {
                                dispatch(getUnwatchedMovies());
                                dispatch(getWatchedMovies());
                            }}
                            inWatchedList={Boolean(watched_movies[suggestion.imdb_id])}
                            inUnwatchedList={Boolean(unwatched_movies[suggestion.imdb_id])}
                        />
                    );
                })}
            </div>
        </div>
    );
}
