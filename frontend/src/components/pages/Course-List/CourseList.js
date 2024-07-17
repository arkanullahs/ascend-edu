import React from 'react';
import CourseForm from '../Course-Form/CourseForm';
import { Link } from 'react-router-dom';
import './CourseList.css'; // Import the CSS file for styling

const CourseList = ({ courses, onUpdate, onDelete, onEnroll, enrolledCourses, showVideos }) => {
    return (
        <div className="course-list">
            {courses.map(course => (
                <div className="course-card" key={course._id}>
                    <h3>
                        <Link to={`/courses/getOneCourse/${course._id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                            {course.title}
                        </Link>

                    </h3>
                    <p>{course.description}</p>
                    <p>Category: {course.category}</p>
                    <p>Difficulty: {course.difficultyLevel}</p>
                    <p>Price: ${course.price}</p>
                    <p>Duration: {course.duration} hours</p>

                    {showVideos && course.videos && (
                        <div>
                            <h4>Videos:</h4>
                            <ul>
                                {course.videos.map((video, index) => (
                                    <li key={index}>{video}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {onUpdate && onDelete && (
                        <>
                            <CourseForm onSubmit={(data) => onUpdate(course._id, data)} initialData={course} />
                            <button onClick={() => onDelete(course._id)}>Delete Course</button>
                        </>
                    )}

                    {onEnroll && !enrolledCourses.some(c => c._id === course._id) && (
                        <button onClick={() => onEnroll(course._id)}>Enroll</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseList;
