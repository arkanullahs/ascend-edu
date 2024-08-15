import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from '../Teacher-Course-Form/TeacherCourseForm';
import CourseCard from './CourseCard';
import CourseFilter from './CourseFilter';
import { FaPlus, FaChalkboardTeacher, FaBook, FaUsers, FaClock } from 'react-icons/fa';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddCourse, setShowAddCourse] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/courses', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(response.data);
            setFilteredCourses(response.data);
        } catch (err) {
            setError('Failed to fetch courses. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCourse = async (courseData) => {
        try {
            const response = await axios.post('/api/courses', courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(prevCourses => [...prevCourses, response.data]);
            setFilteredCourses(prevCourses => [...prevCourses, response.data]);
            setShowAddCourse(false);
        } catch (err) {
            setError('Failed to add course. Please try again.');
        }
    };

    const handleUpdateCourse = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/courses/${id}`, updatedData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(prevCourses =>
                prevCourses.map(course => course._id === id ? response.data : course)
            );
            setFilteredCourses(prevCourses =>
                prevCourses.map(course => course._id === id ? response.data : course)
            );
        } catch (err) {
            setError('Failed to update course. Please try again.');
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`/api/courses/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
            setFilteredCourses(prevCourses => prevCourses.filter(course => course._id !== id));
        } catch (err) {
            setError('Failed to delete course. Please try again.');
        }
    };

    const handleFilter = (filterCriteria) => {
        const { name, minDuration, maxDuration, minStudents, maxStudents } = filterCriteria;
        let filtered = courses;

        if (name) {
            filtered = filtered.filter(course => course.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (minDuration) {
            filtered = filtered.filter(course => course.duration >= minDuration);
        }
        if (maxDuration) {
            filtered = filtered.filter(course => course.duration <= maxDuration);
        }
        if (minStudents) {
            filtered = filtered.filter(course => course.students.length >= minStudents);
        }
        if (maxStudents) {
            filtered = filtered.filter(course => course.students.length <= maxStudents);
        }

        setFilteredCourses(filtered);
    };

    if (isLoading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="teacher-dashboard">
            <header className="dashboard-header">
                <h1>Teacher Dashboard</h1>
                <button className="add-course-button" onClick={() => setShowAddCourse(!showAddCourse)}>
                    <FaPlus /> Add Course
                </button>
            </header>

            <CourseFilter onFilter={handleFilter} />

            <div className="dashboard-grid">
                <div className="dashboard-card summary-card">
                    <div className="summary-item">
                        <FaChalkboardTeacher /> {courses.length} Courses
                    </div>
                    <div className="summary-item">
                        <FaUsers /> Total Students
                    </div>
                    <div className="summary-item">
                        <FaClock /> Total Hours
                    </div>
                </div>

                {filteredCourses.map(course => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        onUpdate={handleUpdateCourse}
                        onDelete={handleDeleteCourse}
                    />
                ))}
            </div>

            {showAddCourse && (
                <CourseForm onAddCourse={handleAddCourse} onCancel={() => setShowAddCourse(false)} />
            )}
        </div>
    );
};

export default TeacherDashboard;
