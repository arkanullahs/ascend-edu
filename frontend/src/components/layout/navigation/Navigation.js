import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdHome, IoMdBook, IoMdSearch, IoMdLogOut } from 'react-icons/io';
import logo from './logo3.png';
import { Navbar, Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
    const [scrolling, setScrolling] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const history = useHistory();

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 767);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        history.push("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [isLoggedIn]);

    return (
        <Navbar variant="light" expand="md" className={`menu ${scrolling ? 'hidden' : ''} ${isMobileView ? 'mobile-view' : ''}`} fixed="top">
            <Link to="/">
                <Navbar.Brand>
                    <motion.img
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 1 }}
                        alt="logo"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mx-2"
                    /> ASCEND
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/" className={`nav-icon d-none d-md-block ${isMobileView ? 'mobile-view' : ''}`}>
                        <IoMdHome size={24} className="ios-icon" />
                        <span className="nav-text">Home</span>
                    </Link>
                    <Link to="/courses" className={`nav-icon d-none d-md-block ${isMobileView ? 'mobile-view' : ''}`}>
                        <IoMdBook size={24} className="ios-icon" />
                        <span className="nav-text">Courses</span>
                    </Link>
                    <Link to="/courses" className={`nav-icon d-none d-md-block ${isMobileView ? 'mobile-view' : ''}`}>
                        <IoMdSearch size={24} className="ios-icon" />
                        <span className="nav-text">Search</span>
                    </Link>
                    {isLoggedIn && (
                        <div className={`nav-icon d-none d-md-block ${isMobileView ? 'mobile-view' : ''}`} onClick={handleLogout}>
                            <IoMdLogOut size={24} className="ios-icon" />
                            <span className="nav-text">Logout</span>
                        </div>
                    )}
                    <Link to="/" className={`nav-link d-md-none ${isMobileView ? 'mobile-view' : ''}`}>
                        Home
                    </Link>
                    <Link to="/courses" className={`nav-link d-md-none ${isMobileView ? 'mobile-view' : ''}`}>
                        Courses
                    </Link>
                    <Link to="/courses" className={`nav-link d-md-none ${isMobileView ? 'mobile-view' : ''}`}>
                        Search
                    </Link>
                    {isLoggedIn && (
                        <div className={`nav-link d-md-none ${isMobileView ? 'mobile-view' : ''}`} onClick={handleLogout}>
                            Logout
                        </div>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
