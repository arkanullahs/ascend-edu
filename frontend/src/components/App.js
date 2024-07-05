import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './layout/navigation/Navigation';
import Footer from './layout/Footer/Footer';
import Home from './pages/Home/Home';
import CoursesList from './pages/Courses-list/Courses-list';
import CourseDetails from './pages/Course-details/Course-details';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} />

            <main>
                <AnimatePresence>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/courses" render={props => isLoggedIn ? <CoursesList {...props} /> : <Redirect to="/login" />} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" render={props => !isLoggedIn ? <Login {...props} /> : <Redirect to="/courses" />} />
                        <Route exact path="/courses/:course_id" render={props => isLoggedIn ? <CourseDetails {...props} /> : <Redirect to="/login" />} />
                        <Route path="*" render={() => <Redirect to="/" />} />
                    </Switch>
                </AnimatePresence>
            </main>

            <Footer />
        </>
    );
};

export default App;
