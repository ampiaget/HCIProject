import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Post from './components/Post';
import Navbar from './components/NavBar/Navbar';
import './App.css'

const App = () => {
    return (
        <div>
            <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/post" element={<Post />} />
                </Routes>
            </div>
        </Router>
        {/* <p> Welcome to Clever Cook! </p> */}
        </div>
        
    );
}

export default App;
