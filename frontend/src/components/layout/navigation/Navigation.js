import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './logo3.png';
import './Navigation.css';

const Navigation = () => {
    const [scrolling, setScrolling] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const history = useHistory();
    const location = useLocation();

    const handleScroll = () => {
        if (window.scrollY > 50) {
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

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('userRole');
            setIsLoggedIn(!!token);
            setUserRole(role || '');
        };

        checkLoginStatus();
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setUserRole('');
        history.push('/');
    };

    return (
        <Navbar
            variant="light"
            expand="md"
            className={`menu ${scrolling ? 'scrolled' : ''} ${isMobileView ? 'mobile-view' : ''}`}
            fixed="top"
        >
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
                                <Link to="/teacher-dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link to="/student-dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            )}
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/signup" className="nav-link">
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