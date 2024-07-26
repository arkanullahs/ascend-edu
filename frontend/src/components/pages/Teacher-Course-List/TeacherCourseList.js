import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import CourseForm from '../Teacher-Course-Form/TeacherCourseForm';
import './TeacherCourseList.css';

const CourseList = ({ courses, onUpdate, onDelete }) => {
    const [editingCourse, setEditingCourse] = useState(null);
    const [expandedCourse, setExpandedCourse] = useState(null);

    const handleEdit = (course) => {
        setEditingCourse(course);
    };

    const handleUpdate = (id, updatedData) => {
        onUpdate(id, updatedData);
        setEditingCourse(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            onDelete(id);
        }
    };

    const toggleExpand = (id) => {
        setExpandedCourse(expandedCourse === id ? null : id);
    };

    return (
        <div className="course-list">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <React.Fragment key={course._id}>
                            <tr>
                                <td>{course.title}</td>
                                <td>{course.category}</td>
                                <td>{course.difficultyLevel}</td>
                                <td>${course.price}</td>
                                <td>{course.duration} hours</td>
                                <td>
                                    <button onClick={() => handleEdit(course)} className="action-btn edit-btn">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(course._id)} className="action-btn delete-btn">
                                        <FaTrash />
                                    </button>
                                    <button onClick={() => toggleExpand(course._id)} className="action-btn expand-btn">
                                        {expandedCourse === course._id ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </td>
                            </tr>
                            {expandedCourse === course._id && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="course-details">
                                            <h4>Description:</h4>
                                            <p>{course.description}</p>
                                            <h4>Videos:</h4>
                                            <ul>
                                                {course.videos.map((video, index) => (
                                                    <li key={index}>{video}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {editingCourse && editingCourse._id === course._id && (
                                <tr>
                                    <td colSpan="6">
                                        <CourseForm
                                            onSubmit={(data) => handleUpdate(course._id, data)}
                                            initialData={course}
                                        />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;