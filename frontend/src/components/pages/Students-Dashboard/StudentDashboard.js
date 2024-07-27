import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './StudentCourseList';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

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

    if (isLoading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );

    if (error) return <Alert severity="error">{error}</Alert>;

    const availableCourses = courses.filter(course => !enrolledCourses.some(ec => ec._id === course._id));

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Student Dashboard
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
                    Enrolled Courses
                </Typography>
                <CourseList
                    courses={enrolledCourses}
                    enrolledCourses={enrolledCourses}
                    isEnrolledList={true}
                />
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
                    Available Courses
                </Typography>
                <CourseList
                    courses={availableCourses}
                    onEnroll={handleEnroll}
                    enrolledCourses={enrolledCourses}
                    isEnrolledList={false}
                />
            </Box>
        </Container>
    );
};

export default StudentDashboard;