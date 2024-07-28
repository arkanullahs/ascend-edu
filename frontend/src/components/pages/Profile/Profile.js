import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        fetchUserProfile();
        fetchCourses();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('https://ascend-edu-server.onrender.com/api/users/profile', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setUser(response.data);
            setFormData({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                password: '',
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const url = user?.role === 'teacher' ?
                'https://ascend-edu-server.onrender.com/api/courses/teacher' :
                'https://ascend-edu-server.onrender.com/api/users/enrolledCourses';
            const response = await axios.get(url, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('https://ascend-edu-server.onrender.com/api/users/profile', formData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setIsEditing(false);
            fetchUserProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <motion.div
                className="profile-header"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>{user.firstName} {user.lastName}</h1>
                <div className="role-pill">{user.role}</div>
            </motion.div>
            <div className="profile-content">
                <motion.div
                    className="profile-section user-info"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2>User Information</h2>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="edit-form">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn save">Save Changes</button>
                                <button type="button" className="btn cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="user-details">
                            <p><strong>First Name:</strong> {user.firstName}</p>
                            <p><strong>Last Name:</strong> {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button className="btn edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    )}
                </motion.div>
                <motion.div
                    className="profile-section courses"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2>{user.role === 'teacher' ? 'Created Courses' : 'Enrolled Courses'}</h2>
                    {courses.length > 0 ? (
                        <ul className="course-list">
                            {courses.map((course) => (
                                <motion.li
                                    key={course._id}
                                    className="course-item"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {course.title}
                                </motion.li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-courses">No courses {user.role === 'teacher' ? 'created' : 'enrolled'} yet.</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;