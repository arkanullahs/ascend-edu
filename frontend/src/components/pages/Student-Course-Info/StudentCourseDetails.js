import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FiClock, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import '../Students-Dashboard/CourseStyles.css';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://ascend-edu-server.onrender.com/api/courses/getOneCourse/${courseId}`, {
                    headers: { 'x-auth-token': token }
                });
                setCourse(response.data);
                if (response.data.videos.length > 0) {
                    setVideoUrl(response.data.videos[0]);
                }
            } catch (err) {
                console.error('Error fetching course details:', err);
                setError('Failed to fetch course details');
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (error) return <div className="error-message">{error}</div>;
    if (!course) return <div className="loading-message">Loading...</div>;

    return (
        <div className="course-details">
            <h1 className="course-details-title">{course.title}</h1>
            <img className="course-details-image" src={course.imageUrl} alt={course.title} />
            <p className="course-details-description">{course.description}</p>
            <div className="course-details-info">
                <span className="info-item">{course.category}</span>
                <span className="info-item">{course.difficultyLevel}</span>
                <span className="info-item"><FiClock /> {course.duration} hours</span>
                <span className="info-item"><FiDollarSign /> {course.price}</span>
            </div>
            <p className="course-instructor"><strong>Lead Instructor:</strong> {course.lead}</p>

            <div className="what-you-learn">
                <h3>What You Will Learn</h3>
                <ul>
                    {course.whatYouWillLearn.map((item, index) => (
                        <li key={index}><FiCheckCircle /> {item}</li>
                    ))}
                </ul>
            </div>

            <div className="video-player">
                <h3>Course Content</h3>
                <div className="video-list">
                    {course.videos.map((video, index) => (
                        <button key={index} className="video-button" onClick={() => setVideoUrl(video)}>
                            Lesson {index + 1}
                        </button>
                    ))}
                </div>
                {videoUrl && (
                    <ReactPlayer
                        url={videoUrl}
                        controls
                        width='100%'
                        height='400px'
                        className="react-player"
                    />
                )}
            </div>

            <Link to="/student-dashboard">
                <button className="back-button">Back to Courses</button>
            </Link>
        </div>
    );
};

export default CourseDetails;