import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import CourseForm from '../Teacher-Course-Form/TeacherCourseForm';
import CourseCard from './CourseCard';
import { FaPlus, FaChalkboardTeacher } from 'react-icons/fa';
import './TeacherDashboard.css';

const useFetchCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.get('https://ascend-edu-server.onrender.com/api/courses/teacher', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(response.data);
        } catch (err) {
            setError('Failed to fetch courses');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return { courses, isLoading, error, fetchCourses };
};

const TeacherDashboard = () => {
    const { courses, isLoading, error, fetchCourses } = useFetchCourses();
    const [showAddCourse, setShowAddCourse] = useState(false);

    const handleAddCourse = async (courseData) => {
        try {
            const response = await axios.post('https://ascend-edu-server.onrender.com/api/courses', courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchCourses(); // Refresh the course list
            setShowAddCourse(false);
        } catch (err) {
            alert('Failed to add course');
        }
    };

    const handleUpdateCourse = async (id, courseData) => {
        try {
            await axios.put(`https://ascend-edu-server.onrender.com/api/courses/${id}`, courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchCourses(); // Refresh the course list
        } catch (err) {
            alert('Failed to update course');
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`https://ascend-edu-server.onrender.com/api/courses/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchCourses(); // Refresh the course list
        } catch (err) {
            alert('Failed to delete course');
        }
    };

    if (isLoading) {
        return <div className="teacher-dashboard__loading">Loading courses...</div>;
    }

    if (error) {
        return <div className="teacher-dashboard__error">{error}</div>;
    }

    return (
        <div className="teacher-dashboard">
            <header className="teacher-dashboard__header">
                <h1 className="teacher-dashboard__title">
                    <FaChalkboardTeacher /> Teacher Dashboard
                </h1>
                <button 
                    className="teacher-dashboard__add-course-btn" 
                    onClick={() => setShowAddCourse(prevShow => !prevShow)}
                >
                    <FaPlus /> {showAddCourse ? 'Cancel' : 'Add New Course'}
                </button>
            </header>
            <div className="teacher-dashboard__content">
                {showAddCourse && <CourseForm onSubmit={handleAddCourse} />}
                <div className="teacher-dashboard__course-list">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <CourseCard 
                                key={course._id}
                                course={course}
                                onUpdate={handleUpdateCourse}
                                onDelete={handleDeleteCourse}
                            />
                        ))
                    ) : (
                        <div className="teacher-dashboard__no-courses">No courses available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
