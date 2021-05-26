import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { Header } from './components/Header/Header';

import { Watch } from './pages/Watch/Watch';
import { Watched } from './pages/Watched/Watched';
import { Search } from './pages/Search/Search';

import './App.css';

export function App () {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/watch" />
                    </Route>
                    <Route exact path="/watch">
                        <Watch />
                    </Route>
                    <Route exact path="/watched">
                        <Watched />
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
