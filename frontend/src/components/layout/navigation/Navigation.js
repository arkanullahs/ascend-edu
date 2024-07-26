import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdSearch } from 'react-icons/io';
import logo from './logo3.png';
import { Navbar, Nav } from 'react-bootstrap';

import './Navigation.css';

const Navigation = () => {
    const [scrolling, setScrolling] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
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

        // Check if user is logged in
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        if (token) {
            setIsLoggedIn(true);
            setUserRole(role);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setUserRole('');
        history.push('/');
    };

    const handleNavItemClick = () => {
        // Handle click actions if needed
    };

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
                    {isLoggedIn ? (
                        <>
                            {userRole === 'teacher' ? (
                                <Link to="/teacher-dashboard" className={`nav-link ${isMobileView ? 'mobile-view' : ''}`} onClick={handleNavItemClick}>
                                    Dashboard
                                </Link>
                            ) : (
                                <Link to="/student-dashboard" className={`nav-link ${isMobileView ? 'mobile-view' : ''}`} onClick={handleNavItemClick}>
                                    Dashboard
                                </Link>
                            )}
                            <Nav.Link onClick={handleLogout} className={`${isMobileView ? 'mobile-view' : ''}`}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={`nav-link ${isMobileView ? 'mobile-view' : ''}`} onClick={handleNavItemClick}>
                                Login
                            </Link>
                            <Link to="/signup" className={`nav-link ${isMobileView ? 'mobile-view' : ''}`} onClick={handleNavItemClick}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;