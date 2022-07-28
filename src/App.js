import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
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
                <Routes>
                    <Route path="*" element={<Watch />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route path="/watched" element={<Watched />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
