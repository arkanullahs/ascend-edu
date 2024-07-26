import React, { useState } from 'react';
import { FaBook, FaLayerGroup, FaChartBar, FaDollarSign, FaClock, FaVideo, FaPlus, FaRegImage } from 'react-icons/fa';
import './TeacherCourseForm.css';

const CourseForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        imageURL: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        title: '',
        description: '',
        category: '',
        difficultyLevel: '',
        price: '',
        duration: '',
        whatYouWillLearn: [],
        videos: []
    });
    const [videoInput, setVideoInput] = useState('');
    const [whatYouWillLearnInput, setwhatYouWillLearnInput] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVideoChange = (e) => {
        setVideoInput(e.target.value);
    };
    const handlewhatYouWillLearnChange = (e) => {
        setwhatYouWillLearnInput(e.target.value);
    };
    const addwhatYouWillLearn = () => {
        if (whatYouWillLearnInput.trim()) {
            setFormData({ ...formData, whatYouWillLearn: [...formData.whatYouWillLearn, whatYouWillLearnInput.trim()] });
            setwhatYouWillLearnInput('');
        }
    };

    const addVideo = () => {
        if (videoInput.trim()) {
            setFormData({ ...formData, videos: [...formData.videos, videoInput.trim()] });
            setVideoInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="modern-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <FaRegImage className="form-icon" />
                <input
                    name="imageUrl"
                    value={formData.imageURL}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                />
            </div>
            <div className="form-group">
                <FaBook className="form-icon" />
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Course Title"
                    required
                />
            </div>

            <div className="form-group">
                <FaLayerGroup className="form-icon" />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Course Description"
                    required
                />
            </div>

            <div className="form-group">
                <FaLayerGroup className="form-icon" />
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />
            </div>

            <div className="form-group">
                <FaChartBar className="form-icon" />
                <select
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Difficulty Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <div className="form-group">
                <FaDollarSign className="form-icon" />
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
            </div>

            <div className="form-group">
                <FaClock className="form-icon" />
                <input
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration (in hours)"
                    required
                />
            </div>

            <div className="form-group">
                <FaVideo className="form-icon" />
                <input
                    name="videoInput"
                    value={videoInput}
                    onChange={handleVideoChange}
                    placeholder="Video Link"
                />
                <button type="button" onClick={addVideo} className="add-video-btn">
                    <FaPlus />
                </button>
            </div>
            {formData.videos.length > 0 && (
                <div className="video-list">
                    <h4>Added Videos:</h4>
                    <ul>
                        {formData.videos.map((video, index) => (
                            <li key={index}>{video}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="form-group">
                <FaVideo className="form-icon" />
                <input
                    name="whatYouWillLearnInput"
                    value={whatYouWillLearnInput}
                    onChange={handlewhatYouWillLearnChange}
                    placeholder="What one would learn"
                />
                <button type="button" onClick={addwhatYouWillLearn} className="add-video-btn">
                    <FaPlus />
                </button>
            </div>
            {formData.whatYouWillLearn.length > 0 && (
                <div className="video-list">
                    <h4>What one would learn from this course:</h4>
                    <ul>
                        {formData.whatYouWillLearn.map((whatYouWillLearn, index) => (
                            <li key={index}>{whatYouWillLearn}</li>
                        ))}
                    </ul>
                </div>
            )}



            <button type="submit" className="submit-btn">
                {initialData ? 'Update Course' : 'Add Course'}
            </button>
        </form>
    );
};

export default CourseForm;