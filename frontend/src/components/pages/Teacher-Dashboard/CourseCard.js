import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUsers, FaClock, FaDollarSign } from 'react-icons/fa';
import CourseForm from '../Teacher-Course-Form/TeacherCourseForm';

const CourseCard = ({ course, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = (updatedData) => {
        onUpdate(course._id, updatedData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            onDelete(course._id);
        }
    };

    if (isEditing) {
        return (
            <div className="dashboard-card form-card">
                <h2>Edit Course</h2>
                <CourseForm onSubmit={handleUpdate} initialData={course} />
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="dashboard-card course-card">
            <div className="course-card-image">
                <img src={course.imageUrl} alt={course.title} />
                <div className="course-card-overlay">
                    <button onClick={handleEdit} className="action-btn edit-btn"><FaEdit /></button>
                    <button onClick={handleDelete} className="action-btn delete-btn"><FaTrash /></button>
                </div>
            </div>
            <div className="course-card-content">
                <h2 className="course-title">{course.title}</h2>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                    <div className="meta-item"><FaUsers /> 0 students</div>
                    <div className="meta-item"><FaClock /> {course.duration} hours</div>
                    <div className="meta-item"><FaDollarSign /> {course.price}</div>
                </div>
                <div className="course-tags">
                    <span className="course-category">{course.category}</span>
                    <span className="course-difficulty">{course.difficultyLevel}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;