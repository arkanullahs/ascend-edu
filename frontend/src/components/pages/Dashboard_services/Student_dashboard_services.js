import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './CourseList';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/courses');
                setAllCourses(response.data);
                const enrolledResponse = await axios.get('/api/students/enrolledCourses');
                setEnrolledCourses(enrolledResponse.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            await axios.post(`/api/students/enroll`, { courseId });
            const updatedEnrolledCourses = await axios.get('/api/students/enrolledCourses');
            setEnrolledCourses(updatedEnrolledCourses.data);
        } catch (error) {
            console.error('Failed to enroll', error);
        }
    };

    if (loading) {
        return <div className="sd-loading">Loading...</div>;
    }

    if (error) {
        return <div className="sd-error">Error loading courses: {error.message}</div>;
    }

    return (
        <div className="student-dashboard">
            <h1 className="sd-title">Student Dashboard</h1>
            <div className="sd-course-section">
                <h2 className="sd-section-title">Available Courses</h2>
                <CourseList 
                    courses={allCourses} 
                    onEnroll={handleEnroll} 
                    enrolledCourses={enrolledCourses} 
                    isEnrolledList={false} 
                />
            </div>
            <div className="sd-enrolled-section">
                <h2 className="sd-section-title">Enrolled Courses</h2>
                <CourseList 
                    courses={enrolledCourses} 
                    onEnroll={handleEnroll} 
                    enrolledCourses={enrolledCourses} 
                    isEnrolledList={true} 
                />
            </div>
        </div>
    );
};

export default StudentDashboard;