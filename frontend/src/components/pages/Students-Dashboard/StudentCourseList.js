import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiDollarSign } from 'react-icons/fi';
import './CourseStyles.css';

const CourseList = ({ courses, onEnroll, enrolledCourses, isEnrolledList }) => {
    return (
        <div className="course-list">
            {courses.map(course => (
                <div className="course-card" key={course._id}>
                    <img className="course-image" src={course.imageUrl} alt={course.title} />
                    <div className="course-content">
                        <h2 className="course-title">{course.title}</h2>
                        <p className="course-description">{course.description}</p>
                        <div className="course-info">
                            <span className="course-category">{course.category}</span>
                            <span className="course-difficulty">{course.difficultyLevel}</span>
                        </div>
                        <div className="course-info">
                            <span className="course-duration">
                                <FiClock /> {course.duration} hours
                            </span>
                            <span className="course-price">
                                <FiDollarSign /> {course.price}
                            </span>
                        </div>
                        {!isEnrolledList && !enrolledCourses.some(c => c._id === course._id) ? (
                            <button className="enroll-button" onClick={() => onEnroll(course._id)}>
                                Enroll
                            </button>
                        ) : (
                            <Link to={`/courses/getOneCourse/${course._id}`}>
                                <button className="view-button">View Course</button>
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseList;