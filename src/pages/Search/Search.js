import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSuggestions,
  selectSuggestions,
} from './searchSlice';

import styles from './Search.module.css';

export function Search() {
  const dispatch = useDispatch();
  const suggestions = useSelector(selectSuggestions);

  console.log(suggestions);

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
            <div className={styles.result}>
              <img src={`${suggestion.Poster}`} />
              <span>{suggestion.Title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
