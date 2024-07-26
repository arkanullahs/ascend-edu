import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './StudentCourseList.js';
import './StudentDashboard.css'; // Import the CSS file for styling

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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="student-dashboard">
            <h1>Student Dashboard</h1>
            <h2>All Courses</h2>
            <CourseList
                courses={courses}
                onEnroll={handleEnroll}
                enrolledCourses={enrolledCourses}
            />
            <h2>Enrolled Courses</h2>
            <CourseList
                courses={enrolledCourses}
                showVideos={true}
            />
        </div>
    );
};

export default StudentDashboard;