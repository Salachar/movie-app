import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getSuggestions,
    selectSuggestions,
} from './searchSlice';
import {
    addMovie
} from '../../components/Movie/movieSlice';
import {
    getMovies as getUnwatchedMovies,
    selectMoviesByID as selectUnwatchedMovies,
} from '../Watch/watchSlice';
import {
    getMovies as getWatchedMovies,
    selectMoviesByID as selectWatchedMovies,
} from '../Watched/watchedSlice';

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
                {suggestions.map((movie) => {
                    const inWatchedList = Boolean(watched_movies[movie.imdb_id]);
                    const inUnwatchedList = Boolean(unwatched_movies[movie.imdb_id]);
                    const in_list = inUnwatchedList || inWatchedList;
                    const imdb_url = `https://www.imdb.com/title/${movie.imdb_id}/`;

                    return (
                        <div className={styles.movie}>
                            <img src={`${movie.poster}`} alt="" onError={(e) => {
                                e.currentTarget.style.visibility = 'hidden';
                            }} />

                            <div className={styles.title}>{movie.title}</div>
                            <a className={styles.imdb_link} href={imdb_url} target="_blank" rel="noreferrer" >View on IMDB</a>

                            {!in_list && (
                                <div
                                    className={styles.add}
                                    onClick={(e) => {
                                        dispatch(addMovie(movie)).then(() => {
                                            dispatch(getUnwatchedMovies());
                                            dispatch(getWatchedMovies());
                                        });
                                    }}
                                >Add to watch list</div>
                            )}

                            {in_list && (
                                <div className={styles.inList}>{`In ${inWatchedList ? 'watched' : 'watch'} list`}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
