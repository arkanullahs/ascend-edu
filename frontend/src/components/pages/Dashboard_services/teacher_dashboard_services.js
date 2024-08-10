import axios from 'axios';
import { useState, useEffect } from 'react';
import CourseForm from '../Teacher-Course-Form/TeacherCourseForm';
import CourseCard from './CourseCard';
import { FaPlus, FaChalkboardTeacher } from 'react-icons/fa';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddCourse, setShowAddCourse] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
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
    };

    const handleAddCourse = async (courseData) => {
        try {
            const response = await axios.post('https://ascend-edu-server.onrender.com/api/courses', courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(prevCourses => [...prevCourses, response.data]);
            setShowAddCourse(false);
        } catch (err) {
            setError('Failed to add course');
        }
    };

    const handleUpdateCourse = async (id, courseData) => {
        try {
            const response = await axios.put(`https://ascend-edu-server.onrender.com/api/courses/${id}`, courseData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(prevCourses => 
                prevCourses.map(course => course._id === id ? response.data : course)
            );
        } catch (err) {
            setError('Failed to update course');
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`https://ascend-edu-server.onrender.com/api/courses/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCourses(prevCourses => 
                prevCourses.filter(course => course._id !== id)
            );
        } catch (err) {
            setError('Failed to delete course');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="teacher-dashboard">
            <header className="dashboard-header">
                <h1 className="dashboard-title"><FaChalkboardTeacher /> Teacher Dashboard</h1>
                <button 
                    className="add-course-btn" 
                    onClick={() => setShowAddCourse(prevShow => !prevShow)}
                >
                    <FaPlus /> {showAddCourse ? 'Cancel' : 'Add New Course'}
                </button>
            </header>
            <div className="dashboard-content">
                {showAddCourse && <CourseForm onSubmit={handleAddCourse} />}
                <div className="course-list">
                    {courses.map(course => (
                        <CourseCard 
                            key={course._id}
                            course={course}
                            onUpdate={handleUpdateCourse}
                            onDelete={handleDeleteCourse}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
