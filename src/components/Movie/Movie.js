import React from 'react';
import { useDispatch } from 'react-redux';
// import classnames from 'classnames';

import {
    loadMovie,
    addMovie,
    updateMovie,
    removeMovie,
} from './movieSlice';

import styles from './Movie.module.css';

export function Movie(props) {
    const dispatch = useDispatch();

    const {
        add = false,
        movie = {},
        onAdd = () => {},
        onWatch = () => {},
        onRemove = () => {},
        onLoad = () => {},
        inWatchedList = false,
        inUnwatchedList = false,
    } = props;
    const {
        watched = false,
        hydrated = false,
    } = movie;

    return (
        <div className={styles.movie}>
            <div
                className={styles.remove}
                onClick={(e) => {
                    dispatch(removeMovie(movie)).then(() => {
                        onRemove();
                    });
                }}
            >{String.fromCharCode('215')}</div>

            <img src={`${movie.poster}`} alt="" onError={(e) => {
                e.currentTarget.style.visibility = 'hidden';
            }} />

            <div className={styles.info}>
                <div className={styles.title}>{movie.title}</div>
                <div className={styles.ratings}>
                    <a
                        className={styles.imdb_link}
                        href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                        target="_blank"
                        rel="noreferrer"
                    >IMDB: {movie.imdb_rating}</a>
                    <span>Rotten Tomatoes: {movie.rotten_tomatoes_rating}</span>
                </div>
                <div className={styles.details}>
                    <span>Rated: {movie.rated}</span>
                    <span>Runtime: {movie.runtime}</span>
                </div>
                <div className={styles.cast}>
                    <div>Director: {movie.director}</div>
                    <div>Actors: {movie.actors}</div>
                </div>
                <div className={styles.plot}>{movie.plot}</div>
            </div>

            {!hydrated && (
                <div
                    className={styles.loadData}
                    onClick={(e) => {
                        dispatch(loadMovie(movie)).then(() => {
                            onLoad();
                        });
                    }}
                >Load data</div>
            )}

            {(inWatchedList || inUnwatchedList) && (
                <div className={styles.inList}>{`In ${inWatchedList ? 'watched' : 'watch'} list`}</div>
            )}

            <div
                className={styles.watch}
                onClick={(e) => {
                    dispatch(updateMovie({
                        ...movie,
                        watched: !movie.watched,
                    })).then(() => {
                        onWatch();
                    });
                }}
            >{`Mark as ${watched ? 'unwatched' : 'watched'}`}</div>
        </div>
    );
}
