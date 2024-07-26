import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './StudentCourseDetails.css'; // Import the CSS file for styling

const CourseDetails = () => {
    const { courseId } = useParams(); // Extract courseId from the URL
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                const response = await axios.get(`https://ascend-edu-server.onrender.com/api/courses/getOneCourse/${courseId}`, {
                    headers: { 'x-auth-token': token } // Send token in headers
                });
                setCourse(response.data);
                if (response.data.videos.length > 0) {
                    setVideoUrl(response.data.videos[0]); // Set the first video as default
                }
            } catch (err) {
                console.error('Error fetching course details:', err);
                setError('Failed to fetch course details');
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (error) return <div>{error}</div>;
    if (!course) return <div>Loading...</div>;

    return (
        <div className="course-details">
            <h1>{course.title}</h1>
            <img className="course-image" src={course.imageUrl} alt={course.title} />
            <p><strong>Lead:</strong> {course.lead}</p>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Difficulty Level:</strong> {course.difficultyLevel}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Duration:</strong> {course.duration} hours</p>

            <h4>What You Will Learn:</h4>


            {/* Video Player */}
            <h3>Currently Playing:</h3>
            {videoUrl && (
                <ReactPlayer
                    url={videoUrl}
                    controls
                    width='100%'
                    height='400px'
                />
            )}

            <h4>Available Videos</h4>
            <ul>
                {course.videos.map((video, index) => (
                    <li key={index}>
                        <button onClick={() => setVideoUrl(video)}>Watch Lesson {index + 1}</button>
                    </li>
                ))}
            </ul>

            <Link to="/student-dashboard">Back to Courses</Link>
        </div>
    );
};

export default CourseDetails;
