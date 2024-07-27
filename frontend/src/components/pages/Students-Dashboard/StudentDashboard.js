import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './StudentCourseList';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
        fetchEnrolledCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://ascend-edu-server.onrender.com/api/courses', {
                headers: { 'x-auth-token': token }
            });
            setCourses(response.data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch courses');
            setIsLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://ascend-edu-server.onrender.com/api/users/enrolledCourses', {
                headers: { 'x-auth-token': token }
            });
            setEnrolledCourses(response.data);
        } catch (err) {
            setError('Failed to fetch enrolled courses');
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`https://ascend-edu-server.onrender.com/api/courses/${courseId}/enroll`, {}, {
                headers: { 'x-auth-token': token }
            });
            fetchEnrolledCourses();
        } catch (err) {
            setError('Failed to enroll in course');
        }
    };

    if (isLoading) return <div className="sd-loading">Loading...</div>;
    if (error) return <div className="sd-error">{error}</div>;

    const availableCourses = courses.filter(course => !enrolledCourses.some(ec => ec._id === course._id));

    return (
        <div className="sd-container">
            <h1 className="sd-title">Student Dashboard</h1>
            <h2 className="sd-subtitle">Enrolled Courses</h2>
            <CourseList
                courses={enrolledCourses}
                enrolledCourses={enrolledCourses}
                isEnrolledList={true}
            />
            <h2 className="sd-subtitle">Available Courses</h2>
            <CourseList
                courses={availableCourses}
                onEnroll={handleEnroll}
                enrolledCourses={enrolledCourses}
                isEnrolledList={false}
            />
        </div>
    );
};

export default StudentDashboard;