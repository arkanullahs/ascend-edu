import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from '../Course-Form/CourseForm';
import CourseList from '../Course-List/CourseList';

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/courses/teacher', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(response.data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch courses');
            setIsLoading(false);
        }
    };

    const handleAddCourse = async (courseData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/courses', courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses([...courses, response.data]);
        } catch (err) {
            setError('Failed to add course');
        }
    };

    const handleUpdateCourse = async (id, courseData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/courses/${id}`, courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(courses.map(course => course._id === id ? response.data : course));
        } catch (err) {
            setError('Failed to update course');
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(courses.filter(course => course._id !== id));
        } catch (err) {
            setError('Failed to delete course');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <CourseForm onSubmit={handleAddCourse} />
            <CourseList
                courses={courses}
                onUpdate={handleUpdateCourse}
                onDelete={handleDeleteCourse}
                showVideos={true} // Ensure videos are shown
            />
        </div>
    );
};

export default TeacherDashboard;
