import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './CourseList';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loadingAllCourses, setLoadingAllCourses] = useState(true);
    const [loadingEnrolledCourses, setLoadingEnrolledCourses] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllCourses();
        fetchEnrolledCourses();
    }, []);

    const fetchAllCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setAllCourses(response.data);
        } catch (error) {
            setError(`Failed to fetch courses: ${error.message}`);
        } finally {
            setLoadingAllCourses(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const response = await axios.get('/api/students/enrolledCourses');
            setEnrolledCourses(response.data);
        } catch (error) {
            setError(`Failed to fetch enrolled courses: ${error.message}`);
        } finally {
            setLoadingEnrolledCourses(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            await axios.post(`/api/students/enroll`, { courseId });
            fetchEnrolledCourses();
        } catch (error) {
            console.error('Failed to enroll:', error);
        }
    };

    if (loadingAllCourses || loadingEnrolledCourses) {
        return <div className="sd-loading">Loading...</div>;
    }

    if (error) {
        return <div className="sd-error">{error}</div>;
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
                    enrolledCourses={enrolledCourses} 
                    isEnrolledList={true} 
                />
            </div>
        </div>
    );
};

export default StudentDashboard;
