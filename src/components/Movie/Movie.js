import React from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import {
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
        onWatch = () => {},
        inWatchedList = false,
        inUnwatchedList = false,
    } = props;
    const {
        watched = false
    } = movie;

    console.log(inWatchedList, inUnwatchedList);

    return (
        <div className={styles.movie}>
            {!add && (
                <div
                    className={styles.remove}
                    onClick={(e) => {
                        dispatch(removeMovie(movie));
                    }}
                >{String.fromCharCode('215')}</div>
            )}
            <img src={`${movie.poster}`} alt="" />
            <div className={styles.info}>
                <div className={styles.title}>{movie.title}</div>
            </div>
            {(add && !inWatchedList && !inUnwatchedList) && (
                <div
                    className={styles.add}
                    onClick={(e) => {
                        dispatch(addMovie(movie));
                    }}
                >Add to watch list</div>
            )}
            {(inWatchedList || inUnwatchedList) && (
                <div className={styles.inList}>{`In ${inWatchedList ? 'watched' : 'watch'} list`}</div>
            )}
            {(!add) && (
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
            )}
        </div>
    );
}
