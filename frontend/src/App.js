import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setUser } from './store/actions/auth';

import MainPage from './components/MainPage';
import ImageLibrary from './components/ImageLibrary';
import About from './components/Header/About';
import Contact from './components/Header/Contact';
import Profile from './components/Profile';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!Cookies.get('token')) {
            dispatch(setUser(null));
        }
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/library" element={<ImageLibrary />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;
