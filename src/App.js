import React from 'react';
// import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// import { WatchList } from './pages/WatchList/WatchList';
// import { WatchedList } from './pages/WatchedList/WatchedList';
import { Search } from './pages/Search/Search';


import './App.css';

export function App () {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="header">
          <Link className="header-link" to="/">Watch List</Link>
          <Link className="header-link" to="/watched">Watched</Link>
          <Link className="header-link" to="/search">Search</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <div>WATCH LIST</div>
          </Route>
          <Route exact path="/watched">
            <div>WATCHED</div>
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
